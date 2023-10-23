import { builder } from '../builder';

export enum Result {
  SUCCESS = 'SUCCESS'
}

builder.enumType(Result, { name: 'Result' });
