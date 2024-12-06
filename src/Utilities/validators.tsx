import { SnackbarUtilities } from "../Utilities/snackbar-manager";
import {  PriceConfigToSend } from "../models/prices.model";

export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw SnackbarUtilities.warning('Correo electrónico inválido');
    }
}

export const validatePassword = (password: string) => {    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.-])[A-Za-z\d@$!%*?&.-]{8,}$/;
    if (!passwordRegex.test(password)) {
        throw SnackbarUtilities.warning(
            'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.'
        );
    }
};


export const validateField = (field: string) => {
    if (!field.trim()) {
        throw SnackbarUtilities.warning(`Ningún campo puede estar vacío`);
    }
}

export const validatePriceConfigToSend = (priceConfig: PriceConfigToSend) => {
    // Verificar que profilePrices exista y tenga exactamente 5 perfiles
    if (!priceConfig.profilePrices || priceConfig.profilePrices.length !== 5) {
        throw SnackbarUtilities.warning('Debes asignar un precio para todos los perfiles.');
    }

    // Validar cada perfil en profilePrices
    priceConfig.profilePrices.forEach((profile) => {
        // Verificar que priceH exista y sea un número válido
        if (profile.priceH == null || isNaN(profile.priceH)) {
            throw SnackbarUtilities.warning('Debes asignar un precio para todos los perfiles.');
        }
    });
};

export const validatePasswordsMatch = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
        throw SnackbarUtilities.warning('Las contraseñas no coinciden.');
    }
}