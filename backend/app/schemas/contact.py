"""Request/response models for the contact form."""

from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(default="", max_length=150)
    message: str = Field(min_length=10, max_length=5000)
    # Honeypot field: real users never see or fill it, bots usually do.
    website: str = Field(default="", max_length=200)


class ContactResponse(BaseModel):
    success: bool
    message: str
