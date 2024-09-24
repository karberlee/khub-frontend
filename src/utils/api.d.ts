declare module '@/utils/api' {
  export function get(url: string): Promise<any>
  export function post(url: string, body: any): Promise<any>
  export function patch(url: string, body: any): Promise<any>
  export function del(url: string): Promise<any>
}