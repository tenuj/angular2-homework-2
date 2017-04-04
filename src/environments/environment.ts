// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production          : false,

  freeSoundAPIEnvironment : {
    key                 : "wwdJvgE56Z5IrYJiBJtmsVyyDO0VSAZVACkG2MeR",
    clientId            : "c1P0mtgQUf2l9GlI8nAH",
    baseURL             : "//www.freesound.org/apiv2/",
    defaultPageSize     : 15,
    maximumPageSize     : 150,
    defaultSort         : 'score',
    defaultSearchParams : { query : '', page : 1, pageSize : 15, sort : 'score' }
  }

};
