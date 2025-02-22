// SOURCED FROM @univerjs/engine-formula
import { ArrayValueObject, BaseValueObject, ErrorType, ErrorValueObject } from "@univerjs/engine-formula";



export function checkVariantErrorIsArray(variant: BaseValueObject): BaseValueObject {
    let _variant = variant;

    if (variant.isArray()) {
        const rowCount = (variant as ArrayValueObject).getRowCount();
        const columnCount = (variant as ArrayValueObject).getColumnCount();

        if (rowCount > 1 || columnCount > 1) {
            return ErrorValueObject.create(ErrorType.VALUE);
        }

        _variant = (variant as ArrayValueObject).get(0, 0) as BaseValueObject;
    }

    if (_variant.isError()) {
        return _variant;
    }

    return _variant;
}

export function checkVariantsErrorIsArray(...variants: BaseValueObject[]) {
    for (let i = 0; i < variants.length; i++) {
        const variant = checkVariantErrorIsArray(variants[i]);

        if (variant.isError()) {
            return {
                isError: true,
                errorObject: variant,
            };
        }

        variants[i] = variant;
    }

    return {
        isError: false,
        variants,
    };
}

export function checkVariantsErrorIsArrayOrBoolean(...variants: BaseValueObject[]) {
    for (let i = 0; i < variants.length; i++) {
        const variant = checkVariantErrorIsArray(variants[i]);

        if (variant.isError()) {
            return {
                isError: true,
                errorObject: variant,
            };
        }

        if (variant.isBoolean()) {
            return {
                isError: true,
                errorObject: ErrorValueObject.create(ErrorType.VALUE),
            };
        }

        variants[i] = variant;
    }

    return {
        isError: false,
        variants,
    };
}

// All variants cannot be null.
export function checkVariantsErrorIsNullorArrayOrBoolean(...variants: BaseValueObject[]) {
    for (let i = 0; i < variants.length; i++) {
        let variant = variants[i];

        if (variant.isError()) {
            return {
                isError: true,
                errorObject: variant,
            };
        }

        if (variant.isNull()) {
            return {
                isError: true,
                errorObject: ErrorValueObject.create(ErrorType.NA),
            };
        }

        variant = checkVariantErrorIsArray(variants[i]);

        if (variant.isError()) {
            return {
                isError: true,
                errorObject: variant,
            };
        }

        if (variant.isBoolean()) {
            return {
                isError: true,
                errorObject: ErrorValueObject.create(ErrorType.VALUE),
            };
        }

        variants[i] = variant;
    }

    return {
        isError: false,
        variants,
    };
}

export function checkVariantsErrorIsStringToNumber(...variants: BaseValueObject[]) {
    for (let i = 0; i < variants.length; i++) {
        let variant = variants[i];

        if (variant.isString()) {
            variant = variant.convertToNumberObjectValue();
        }

        if (variant.isError()) {
            return {
                isError: true,
                errorObject: variant,
            };
        }

        variants[i] = variant;
    }

    return {
        isError: false,
        variants,
    };
}
