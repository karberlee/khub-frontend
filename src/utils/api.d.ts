declare module '@/utils/api' {
  export function get(url: string, params?: any): Promise<any>
  export function post(url: string, body: any): Promise<any>
  export function patch(url: string, params: any, body: any): Promise<any>
  export function del(url: string, params: any): Promise<any>
}