declare module "*.md" {
  const attributes: Record<string, any>;
  export { attributes };
}

declare module "*.md" {
  import React from "react";
  const react: React.VFC;
  export { react };
}
