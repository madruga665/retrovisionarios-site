import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';

/**
 * Gera a documentação chamando um modelo de IA com o conteúdo de múltiplos arquivos.
 * @param {string} mainFilePath - O caminho do arquivo principal a ser documentado.
 * @param {string} combinedFileContent - Uma string contendo o conteúdo de todos os arquivos fornecidos.
 * @returns {Promise<string>} A documentação final em formato Markdown.
 */
async function generateAIAssistedDocs(mainFilePath, combinedFileContent) {
  console.log('🧠 Conectando à API do Google Gemini...');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      '❌ A chave de API do Gemini (GEMINI_API_KEY) não foi encontrada. Verifique seu ambiente ou arquivo .env.'
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

    const prompt = `
      Analise o seguinte conjunto de arquivos de código para documentar a funcionalidade principal, focando no arquivo "${path.basename(
        mainFilePath
      )}".

      **Tarefa:**
      Sua tarefa é gerar dois blocos de informação separados por um delimitador.

      **Bloco 1: Documentação em Markdown**
      Gere uma documentação técnica para o arquivo principal "${path.basename(
        mainFilePath
      )}". A documentação deve incluir:
      1. Uma visão geral da responsabilidade do arquivo principal.
      2. Uma descrição detalhada de suas funções exportadas, explicando como elas usam as funções dos outros arquivos fornecidos.
      O tom deve ser técnico, claro e direto. Comece diretamente com o título (\`# 📝 Documentação para...\`).

      **DELIMITADOR:**
      Use a seguinte string exata para separar os dois blocos:
      ---JSON-SEPARATOR---

      **Bloco 2: Dados do Diagrama em JSON**
      Gere um array de objetos JSON que represente os passos de um diagrama de sequência completo, usando o contexto de todos os arquivos fornecidos. Trace o fluxo desde o "Client" até o "Repository" ou "Database", se aplicável. Cada objeto deve ter as chaves: "from", "to", e "label".
      - "from": O componente de origem.
      - "to": O componente de destino.
      - "label": A descrição da ação.
      O JSON deve ser válido e bem formatado.

      **Arquivos de Código para análise:**
      ${combinedFileContent}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const rawText = await response.text();

    console.log('✅ Resposta da IA recebida. Processando...');

    const separator = '---JSON-SEPARATOR---';
    const parts = rawText.split(separator);

    if (parts.length < 2) {
      console.error('Resposta da IA recebida:', rawText);
      throw new Error(
        'A resposta da IA não contém o separador "---JSON-SEPARATOR---" esperado.'
      );
    }

    const markdownContent = parts[0].trim();
    let jsonString = parts[1].trim();

    // Limpa o JSON caso a IA o tenha embrulhado em um bloco de código
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.substring(7, jsonString.length - 3).trim();
    }

    let sequenceSteps;
    try {
      sequenceSteps = JSON.parse(jsonString);
    } catch (e) {
      console.error('JSON inválido recebido da IA:', jsonString);
      throw new Error(`Falha ao analisar o JSON do diagrama: ${e.message}`);
    }

    // Constrói o diagrama Mermaid a partir do JSON
    let mermaidDiagram = '```mermaid\nsequenceDiagram\n';
    if (Array.isArray(sequenceSteps)) {
      for (const step of sequenceSteps) {
        if (step.from && step.to && step.label) {
          const label = step.label.replace(/[:->>()]/g, '_');
          mermaidDiagram += `    ${step.from}->>${step.to}: ${label}\n`;
        }
      }
    }
    mermaidDiagram += '```';

    const finalDocumentation = `${markdownContent}\n\n## Diagrama de Sequência\n\n${mermaidDiagram}`;

    console.log(
      '✅ Documentação e diagrama construídos com sucesso a partir dos dados da IA.'
    );
    return finalDocumentation;
  } catch (error) {
    console.error(
      '❌ Erro ao chamar a API do Gemini ou processar a resposta:',
      error.message
    );
    throw new Error(
      'Falha na comunicação com a API de IA ou no processamento da resposta.'
    );
  }
}

/**
 * Agente de IA para gerar documentação de arquivos da aplicação.
 * Uso: npx tsx agents/documentador.js <arquivo_principal> [arquivo_contexto_1] [arquivo_contexto_2] ...
 */
async function main() {
  console.log('🤖 Documentador AI Agent inicializado.');

  const filePaths = process.argv.slice(2);

  if (filePaths.length === 0) {
    console.error(
      '❌ Erro: Forneça pelo menos o caminho do arquivo principal a ser documentado.'
    );
    console.log(
      'Uso: npx tsx agents/documentador.js <arquivo_principal> [arquivos_de_contexto...]'
    );
    process.exit(1);
  }

  const mainFilePath = filePaths[0];
  let combinedFileContent = '';

  console.log('📄 Analisando os seguintes arquivos:');
  for (const filePath of filePaths) {
    console.log(`   - ${filePath}`);
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      combinedFileContent += `\n\n--- Início do arquivo: ${path.basename(filePath)} ---\n\n`;
      combinedFileContent += '```typescript\n';
      combinedFileContent += fileContent;
      combinedFileContent += '\n```';
    } catch {
      console.error(`\n🚨 Falha ao ler o arquivo de contexto: ${filePath}`);
      process.exit(1);
    }
  }
  console.log('✅ Arquivos lidos com sucesso.');

  try {
    const generatedDocs = await generateAIAssistedDocs(
      mainFilePath,
      combinedFileContent
    );

    const outputDir = 'docs';
    await fs.mkdir(outputDir, { recursive: true });

    const baseFileName = path.basename(mainFilePath).replace(/\.[jt]sx?$/, '');
    const featureName = path.basename(path.dirname(mainFilePath));
    const docsFileName = `${featureName}-${baseFileName}-doc.md`;
    const docsFilePath = path.join(outputDir, docsFileName);

    await fs.writeFile(docsFilePath, generatedDocs);
    console.log(`✅ Documentação real salva com sucesso em: ${docsFilePath}`);
  } catch (error) {
    console.error(`\n🚨 Falha na execução do agente: ${error.message}`);
    process.exit(1);
  }
}

main();
