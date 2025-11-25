// global.d.ts

declare global {
  var ALASKA_OS: {
    ports: Record<string, any>;
    tours: Record<string, any>;
    homepage: any;
    lastUpdatedUTC: string;
  };
}

export {};
