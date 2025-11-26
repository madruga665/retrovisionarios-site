package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/google/generative-ai-go/genai"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

// Step representa um único passo no diagrama de sequência.
type Step struct {
	From  string `json:"from"`
	To    string `json:"to"`
	Label string `json:"label"`
}

func main() {
	fmt.Println("🤖 Documentador AI Agent (Go version) inicializado.")

	if len(os.Args) < 2 {
		log.Fatal("❌ Erro: Forneça pelo menos o caminho do arquivo principal a ser documentado.\nUso: go run documentador.go <arquivo_principal> [arquivos_de_contexto...]")
	}

	filePaths := os.Args[1:]
	mainFilePath := filePaths[0]
	var combinedFileContent strings.Builder

	fmt.Println("📄 Analisando os seguintes arquivos:")
	for _, filePath := range filePaths {
		fmt.Printf("   - %s\n", filePath)
		content, err := os.ReadFile(filePath)
		if err != nil {
			log.Fatalf("🚨 Falha ao ler o arquivo de contexto %s: %v", filePath, err)
		}
		combinedFileContent.WriteString(fmt.Sprintf("\n\n--- Início do arquivo: %s ---\n\n", filepath.Base(filePath)))
		combinedFileContent.WriteString("`typescript\n")
		combinedFileContent.WriteString(string(content))
		combinedFileContent.WriteString("\n`")
	}
	fmt.Println("✅ Arquivos lidos com sucesso.")

	// Gera a documentação
	generatedDocs, err := generateAIAssistedDocs(mainFilePath, combinedFileContent.String())
	if err != nil {
		log.Fatalf("🚨 Falha na execução do agente: %v", err)
	}

	// Salva o arquivo de documentação
	outputDir := "../docs" // Navega para a pasta docs a partir de agents/
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		log.Fatalf("🚨 Falha ao criar o diretório de saída: %v", err)
	}

	baseFileName := strings.TrimSuffix(filepath.Base(mainFilePath), filepath.Ext(mainFilePath))
	featureName := filepath.Base(filepath.Dir(mainFilePath))
	docsFileName := fmt.Sprintf("%s-%s-doc.md", featureName, baseFileName)
	docsFilePath := filepath.Join(outputDir, docsFileName)

	if err := os.WriteFile(docsFilePath, []byte(generatedDocs), 0644); err != nil {
		log.Fatalf("🚨 Falha ao salvar o arquivo de documentação: %v", err)
	}

	fmt.Printf("✅ Documentação real salva com sucesso em: %s\n", docsFilePath)
}

func generateAIAssistedDocs(mainFilePath, combinedFileContent string) (string, error) {
	fmt.Println("🧠 Conectando à API do Google Gemini...")
	ctx := context.Background()

	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		return "", fmt.Errorf("❌ a chave de API do Gemini (GEMINI_API_KEY) não foi encontrada no ambiente")
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return "", fmt.Errorf("❌ erro ao criar cliente da API: %v", err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-2.5-pro") // Usando gemini-pro como padrão
	model.SafetySettings = []*genai.SafetySetting{
		{
			Category:  genai.HarmCategoryHarassment,
			Threshold: genai.HarmBlockNone,
		},
		{
			Category:  genai.HarmCategoryHateSpeech,
			Threshold: genai.HarmBlockNone,
		},
	}

	prompt := fmt.Sprintf(`
      Analise o seguinte conjunto de arquivos de código para documentar a funcionalidade principal, focando no arquivo "%s".

      **Tarefa:**
      Sua tarefa é gerar dois blocos de informação separados por um delimitador.

      **Bloco 1: Documentação em Markdown**
      Gere uma documentação técnica para o arquivo principal "%s". A documentação deve incluir:
      1. Uma visão geral da responsabilidade do arquivo principal.
      2. Uma descrição detalhada de suas funções exportadas, explicando como elas usam as funções dos outros arquivos fornecidos.
      O tom deve ser técnico, claro e direto. Comece diretamente com o título ("# 📝 Documentação para...").

      **DELIMITADOR:**
      Use a seguinte string exata para separar os dois blocos:
      ---JSON-SEPARATOR---

      **Bloco 2: Dados do Diagrama em JSON**
      Gere um array de objetos JSON que represente os passos de um diagrama de sequência completo, usando o contexto de todos os arquivos fornecidos. Trace o fluxo desde o "Client" até o "Repository" ou "Database", se aplicável. Cada objeto deve ter as chaves: "from", "to", e "label". O JSON deve ser válido e bem formatado.

      **Arquivos de Código para análise:**
      %s
    `, filepath.Base(mainFilePath), filepath.Base(mainFilePath), combinedFileContent)

	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return "", fmt.Errorf("❌ erro ao chamar a API do Gemini: %v", err)
	}

	fmt.Println("✅ Resposta da IA recebida. Processando...")
	rawText := fmt.Sprint(resp.Candidates[0].Content.Parts[0])

	separator := "---JSON-SEPARATOR---"
	parts := strings.Split(rawText, separator)
	if len(parts) < 2 {
		return "", fmt.Errorf("a resposta da IA não contém o separador '---JSON-SEPARATOR---' esperado. Resposta recebida: %s", rawText)
	}

	markdownContent := strings.TrimSpace(parts[0])
	jsonString := strings.TrimSpace(parts[1])

	// Limpa o JSON caso a IA o tenha embrulhado em um bloco de código
	re := regexp.MustCompile("(?s)```json(.*)```")
	matches := re.FindStringSubmatch(jsonString)
	if len(matches) > 1 {
		jsonString = strings.TrimSpace(matches[1])
	}

	var sequenceSteps []Step
	if err := json.Unmarshal([]byte(jsonString), &sequenceSteps); err != nil {
		return "", fmt.Errorf("falha ao analisar o JSON do diagrama: %v. JSON recebido: %s", err, jsonString)
	}

	var mermaidBuilder strings.Builder
	mermaidBuilder.WriteString("```mermaid\nsequenceDiagram\n")
	for _, step := range sequenceSteps {
		if step.From != "" && step.To != "" && step.Label != "" {
			mermaidBuilder.WriteString(fmt.Sprintf("    %s->>%s: %s\n", step.From, step.To, step.Label))
		}
	}
	mermaidBuilder.WriteString("```")

	var finalDocBuilder strings.Builder
	finalDocBuilder.WriteString(markdownContent)
	finalDocBuilder.WriteString("\n\n## Diagrama de Sequência\n\n")
	finalDocBuilder.WriteString(mermaidBuilder.String())
	finalDocBuilder.WriteString("\n")

	fmt.Println("✅ Documentação e diagrama construídos com sucesso a partir dos dados da IA.")
	return finalDocBuilder.String(), nil
}
