export interface ToolItem {
  name: string;
  image: string;
  color?: string;
  scale?: number;
  apiInfo?: {
    link?: string;
    login?: string;
    apiKey?: string;
    [key: string]: any;
  };
}
