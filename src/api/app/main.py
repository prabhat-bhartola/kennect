from app.config import KennectConfig
from app.services import auth, comments, posts, users
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure, ExecutionTimeout

client = AsyncIOMotorClient(KennectConfig.MONGO_URL)
db = client.kennect

description = """
APIs for kennect. 🐝
"""

app = FastAPI(title="kennectAPI", description=description)

origins = ["http://localhost:3000", "https://kennect-psi.vercel.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(comments.router)


@app.exception_handler(ConnectionFailure)
async def connection_failure_exception_handler(request, exc):
    return JSONResponse(
        status_code=503,
        content="Service is unavailable, please try again later",
    )


@app.exception_handler(ExecutionTimeout)
async def exceution_timeout_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content="Request taking longer than usual, please try again later",
    )


@app.exception_handler(ValueError)
async def value_error_exception_handler(request: Request, exc: ValueError):
    return JSONResponse(
        status_code=400,
        content={"detail": str(exc)},
    )


@app.exception_handler(Exception)
async def catchall_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content="Internal Server Error",
    )


@app.get("/")
async def root():
    return {"message": "Welcome to Kennect"}
