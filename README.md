# 📌 Instrucciones para ejecutar el proyecto

## 🔁 Clonar el repositorio

```bash
git clone https://github.com/Ruth-ZS/proyecto.git
cd proyecto
```

---

## ⚙️ Requisitos

### ✅ Tener **Deno** instalado

Verifica si ya tienes Deno ejecutando:

```bash
deno --version
```

Si no está instalado, puedes instalarlo con el siguiente comando en PowerShell:

```powershell
iwr https://deno.land/install.ps1 -useb | iex
```

🔄 Luego de instalar Deno, **reinicia Visual Studio Code** para que los cambios se apliquen correctamente.

---

## ▶️ Ejecutar el proyecto

1. Asegúrate de estar en la raíz del proyecto donde se encuentra el archivo `main.ts`
2. Ejecuta el proyecto con permisos de entorno:

```bash
deno run --allow-env main.ts
```

> ⚠️ **Importante:** Para que la conexión a la base de datos funcione correctamente, necesitas un archivo `.env` con las credenciales.  
> Este archivo **no está incluido en el repositorio por motivos de seguridad**, por lo que deberás crearlo manualmente siguiendo el formato de `.env.example` o pedirlo.

---

## 🛠️ Comandos útiles

- Ver en qué rama estás trabajando actualmente:

```bash
git branch
```

- Crear una nueva rama y cambiar a ella:

```bash
git checkout -b nombre-de-tu-rama
```

- Cambiar a una rama existente:

```bash
git checkout nombre-de-tu-rama
```

- Ver los cambios pendientes:

```bash
git status
```

- Traer cambios del repositorio remoto:

```bash
git pull origin main
```