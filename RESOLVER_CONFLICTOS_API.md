# 🔧 Guía para Resolver Conflictos con la Carpeta API

## 🔍 Diagnóstico Rápido

### Opción 1: Conflicto en GitHub Web (Pull Request)

Si estás en GitHub intentando crear o mergear un PR y ves conflictos:

**Solución:**
1. Ve a tu repositorio en GitHub
2. Haz clic en el Pull Request con conflictos
3. Haz clic en "Resolve conflicts"
4. GitHub te mostrará los archivos en conflicto
5. Elige qué cambios mantener (generalmente los de la carpeta `api/` nuevos)
6. Haz clic en "Mark as resolved"
7. Haz clic en "Commit merge"

### Opción 2: Conflicto Local (git pull)

Si hiciste `git pull` y ves conflictos:

**Solución:**
```bash
# Ver qué archivos tienen conflictos
git status

# Si es la carpeta api/, acepta los cambios entrantes
git checkout --theirs api/api-connector.js

# O si quieres mantener tu versión local
git checkout --ours api/api-connector.js

# Marca como resuelto
git add api/api-connector.js

# Completa el merge
git commit -m "Resolver conflictos en carpeta api"

# Push de los cambios
git push
```

### Opción 3: La Carpeta API No Aparece en GitHub

Si subes cambios pero la carpeta `api/` no aparece en GitHub:

**Posibles causas:**
- Hay un archivo `.gitignore` que la excluye
- La carpeta no fue agregada al staging area
- Los archivos no fueron commiteados

**Solución:**
```bash
# Verificar si hay .gitignore bloqueando
cat .gitignore | grep api

# Si la carpeta está siendo ignorada, agrégala forzadamente
git add -f api/api-connector.js

# Verifica que esté en staging
git status

# Commit
git commit -m "Agregar api-connector.js"

# Push
git push
```

### Opción 4: Quiero Reemplazar Todo con la Versión Actualizada

Si quieres descartar todos los cambios locales y usar la versión del repositorio:

**⚠️ CUIDADO: Esto descartará cambios locales**

```bash
# Descartar cambios locales en api/
git checkout HEAD -- api/

# O descartar TODO y sincronizar con GitHub
git fetch origin
git reset --hard origin/claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU

# Forzar sincronización
git pull origin claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU
```

### Opción 5: Trabajando desde Otra Computadora

Si estás en otra computadora y necesitas los últimos cambios:

```bash
# Actualizar referencias
git fetch origin

# Cambiar a la rama correcta
git checkout claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU

# Descargar últimos cambios
git pull origin claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU
```

## 🆘 Soluciones Rápidas por Mensaje de Error

### Error: "error: Your local changes would be overwritten by merge"

```bash
# Guardar cambios locales temporalmente
git stash

# Hacer pull
git pull origin claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU

# Recuperar cambios guardados
git stash pop
```

### Error: "CONFLICT (content): Merge conflict in api/api-connector.js"

```bash
# Opción A: Usar la versión nueva (del servidor)
git checkout --theirs api/api-connector.js
git add api/api-connector.js
git commit -m "Usar versión actualizada de api-connector.js"

# Opción B: Usar tu versión local
git checkout --ours api/api-connector.js
git add api/api-connector.js
git commit -m "Mantener versión local de api-connector.js"
```

### Error: "fatal: refusing to merge unrelated histories"

```bash
git pull origin claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU --allow-unrelated-histories
```

### Error: "The following untracked files would be overwritten"

```bash
# Mover archivos temporalmente
mv api/api-connector.js api/api-connector.js.backup

# Hacer pull
git pull origin claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU

# Comparar versiones si es necesario
# diff api/api-connector.js api/api-connector.js.backup
```

## ✅ Verificación Post-Resolución

Después de resolver los conflictos, verifica:

```bash
# 1. Estado limpio
git status
# Debe mostrar: "nothing to commit, working tree clean"

# 2. Archivos correctos en su lugar
ls -la api/
# Debe mostrar: api-connector.js

# 3. Historial correcto
git log --oneline -3
# Debe mostrar los últimos 3 commits

# 4. Sincronizado con GitHub
git pull origin claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU
# Debe mostrar: "Already up to date"
```

## 🎯 Solución Definitiva (Nuclear Option)

Si nada funciona y quieres empezar limpio:

**⚠️ EXTREMO CUIDADO: Esto borrará TODOS los cambios locales**

```bash
# Backup de todo
cp -r /home/user/sistema_cmg /home/user/sistema_cmg_backup

# Borrar carpeta actual
cd /home/user
rm -rf sistema_cmg

# Clonar de nuevo
git clone https://github.com/eddcool34/sistema_cmg.git
cd sistema_cmg

# Cambiar a la rama correcta
git checkout claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU

# Verificar
ls -la api/
```

## 📞 Información Útil para Debugging

Si nada de esto funciona, ejecuta estos comandos y comparte el resultado:

```bash
# 1. Estado actual
git status

# 2. Branch actual
git branch

# 3. Archivos en conflicto
git diff --name-only --diff-filter=U

# 4. Últimos commits
git log --oneline -5

# 5. Contenido de api/
ls -la api/

# 6. Remote configurado
git remote -v
```

## 💡 Tips Preventivos

Para evitar conflictos en el futuro:

1. **Siempre hacer pull antes de trabajar:**
   ```bash
   git pull origin claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU
   ```

2. **Commitear cambios frecuentemente:**
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push
   ```

3. **No editar archivos directamente en GitHub web y localmente al mismo tiempo**

4. **Usar branches diferentes para trabajar en diferentes máquinas**

## 📋 Checklist de Resolución

- [ ] Identifiqué dónde está el conflicto (GitHub web, local, otra máquina)
- [ ] Ejecuté `git status` para ver el estado
- [ ] Elegí una estrategia de resolución (theirs, ours, manual)
- [ ] Resolví los conflictos
- [ ] Hice `git add` de los archivos resueltos
- [ ] Hice commit de la resolución
- [ ] Hice push de los cambios
- [ ] Verifiqué que todo esté sincronizado
- [ ] Probé que los archivos estén correctos

---

**¿Aún tienes problemas?** Comparte:
1. El mensaje de error exacto que ves
2. El resultado de `git status`
3. Dónde estás trabajando (GitHub web, terminal local, etc.)
