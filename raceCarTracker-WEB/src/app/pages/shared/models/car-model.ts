export interface Car {
  id?: string;
  name?: string;
  plate?: string;
  model?: string;
  owner?: string;
  category_id: {
    id: string;
    name: string;
    description: string;
  };
}
