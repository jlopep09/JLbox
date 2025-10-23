
FROM python:3.14 as builder

# Crear usuario no root
RUN useradd -m fastapiuser

WORKDIR /api


COPY requirements.txt ./
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.txt

COPY . .

USER fastapiuser

CMD ["fastapi", "dev", "--host",  "0.0.0.0"]
