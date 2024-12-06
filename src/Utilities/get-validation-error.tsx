import { TypeWithKey } from "../models/type-with-key"

export const getValidationErrors = (errorCode: any) => {

    const codeMatcher: TypeWithKey<string> = {
        ERR_NETWORK: 'Error de red',
        ERR_AUTH: 'Error de autenticación',
        ERR_BAD_REQUEST: 'Error en la petición',
        ERR_NOT_FOUND: 'No encontrado',
        ERR_INTERNAL_SERVER: 'Error interno del servidor',
        ERR_UNAUTHORIZED: 'No autorizado',
        ERR_FORBIDDEN: 'Prohibido',
        ERR_UNKNOWN: 'Error desconocido',
        ERR_VALIDATION: 'Error de validación',
        ERR_NOT_ALLOWED: 'No permitido',
    };

    return codeMatcher[errorCode];
}