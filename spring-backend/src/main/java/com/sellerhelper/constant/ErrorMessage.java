package com.sellerhelper.constant;

public enum ErrorMessage {
    EMPTY_INPUT_GENERAL("Invalid input provided. One or more properties missing."),
    INVALID_INPUT("Invalid input provided: %s. Property '%s' must be of '%s' pattern."),
    INVALID_INPUT_MISSING_REQUIRED_PROPERTY("Invalid input provided. Property '%s' is required"),
    RESOURCE_NOT_FOUND("No product found for id %s."),
    RESOURCE_ALREADY_EXISTS("Request failed idempotency check. Product already exist."),
    INTERNAL_SERVER_ERROR("An internal server error occurred."),
    JSON_EXCEPTION_MSG("Invalid request due to bad JSON format: %s");

    private final String message;

    private ErrorMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
