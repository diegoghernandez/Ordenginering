export class StatusError extends Error {
   fieldError
   status
   constructor (message: string, status: number, fieldError: {[key: string]: string}) {
      super(message)
      this.name = 'Status error'
      this.status = status
      this.fieldError = fieldError
   }
}