import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { Faqs } from '@/components/marketing/home/faqs';
import { Features } from '@/components/marketing/home/features';
import { Hero } from '@/components/marketing/home/hero';
import { Included } from '@/components/marketing/home/included';
import { Productivity } from '@/components/marketing/home/productivity';
import { StartBuilding } from '@/components/marketing/home/start-building';
import { Testimonails } from '@/components/marketing/home/testimonials';

const metadata = { title: config.site.name, description: config.site.description };

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <div>
        <Hero />
        <Productivity />
        <Included />
        <Features />
        <Testimonails />
        <Faqs />
        <StartBuilding />
      </div>
    </React.Fragment>
  );
}
