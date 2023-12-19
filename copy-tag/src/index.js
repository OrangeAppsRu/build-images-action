import * as core from '@actions/core';
import * as github from '@actions/github'
import { parse as yamlParse} from 'yaml';

import {copyTag} from './lib.js';


async function main() {
  await copyTag('https://harbor.tapclap.com', 'Dmitry Sergeev', 'P15m39abG', 'reg/gemscocos/client', 'stand-ok_mobile-manual-202312182012-gh-workflows-6d15e21f4c', 'test1');
}

async function main() {
  try {
    const context  = github.context;
    const repoName = context.payload.repository.name.toLowerCase();

    const registry         = core.getInput('registry');
    const registryUser     = core.getInput('registry-user');
    const registryPassword = core.getInput('registry-password');
    const fromTag          = core.getInput('from-tag');
    const toTag            = core.getInput('to-tag');
    const images           = yamlParse(core.getInput('opts'));
    

    for (const image of images) {
      const url = `${registry}/${repoName}/${image}`;

      url = url.replace('http://', 'https://');
      if (!url.startsWith('https://')) {
          url = `https://${url}`;
      }
      let pUrl;
      try {
          pUrl = new URL(u);
      } catch(e) {
          throw new Error(`Not valid format of url: "${url}". Error: ${e}`);
      }
      
      copyTag(`${pUrl.origin}`, registryUser, registryPassword, `${pUrl.pathname.slice(1)}`, fromTag, toTag)
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
