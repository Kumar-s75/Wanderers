// src/lib/api-response.ts
export class ApiError extends Error {
    constructor(
      public statusCode: number,
      message: string,
      public errors?: any[]
    ) {
      super(message)
      this.name = 'ApiError'
    }
  }
  
  export function successResponse<T>(data: T, message?: string) {
    return Response.json({
      success: true,
      message,
      data,
    })
  }
  
  export function errorResponse(error: ApiError) {
    return Response.json(
      {
        success: false,
        message: error.message,
        errors: error.errors,
      },
      { status: error.statusCode }
    )
  }