'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  initializeFaro,
  getWebInstrumentations,
  faro,
} from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { version, name } from '../../../package.json';

function FaroEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (faro.api) {
      const url =
        pathname +
        (searchParams?.toString() ? `?${searchParams.toString()}` : '');

      faro.api.pushEvent('page_view', {
        path: pathname,
        url: url,
      });

      faro.api.pushMeasurement({
        type: 'page_view_count',
        values: {
          count: 1,
        },
      });

      if (process.env.NODE_ENV === 'development') {
        console.log(`[Faro] Page View: ${url}`);
      }
    }
  }, [pathname, searchParams]);

  return null;
}

export function FaroMonitoring() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !faro.api) {
      initializeFaro({
        url: process.env.NEXT_PUBLIC_FARO_URL || '',
        app: {
          name: name,
          version: version,
          environment: process.env.NODE_ENV,
        },
        instrumentations: [
          ...getWebInstrumentations({
            captureConsole: true,
          }),
          new TracingInstrumentation(),
        ],
      });
      setInitialized(true);
    } else if (faro.api) {
      setInitialized(true);
    }
  }, []);

  return <Suspense fallback={null}>{initialized && <FaroEvents />}</Suspense>;
}
