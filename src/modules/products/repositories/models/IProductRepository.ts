import { IProduct } from "@modules/products/interfaces/IProduct";



export default interface IProductRepository {
  getByName(name: string): Promise<IProduct>
  incremented(name:string): Promise<IProduct>
  decremented(name:string, value:number): Promise<IProduct>
}
