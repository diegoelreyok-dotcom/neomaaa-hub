# Conflicts of Interest Policy — Politica de Conflictos de Interes

**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Version: 1.0 | Fecha: 15 Abril 2026**

> [!INFO]
> **Documento fuente:** El texto legal definitivo esta publicado en https://neomaaa.com/about/legal-documentation. Este documento interno es una sinopsis para el equipo. Ante discrepancia, prevalece el documento oficial publicado.

---

## 1. Proposito

Esta politica establece el marco mediante el cual **Neomaaa Ltd** ("la Empresa") identifica, previene, gestiona y divulga los **conflictos de interes** que pueden surgir en el curso de la prestacion de servicios de intermediacion financiera a sus clientes.

Se alinea con estandares FATF, buenas practicas de brokers regulados (ESMA, FCA, ASIC aplicables por analogia) y requisitos de la licencia AOFA L15968/N.

---

## 2. Que es un conflicto de interes

Un conflicto de interes existe cuando los intereses de la Empresa, sus empleados o terceros relacionados pueden **influenciar o aparecer como influenciando** el tratamiento justo, honesto y profesional de un cliente.

En la actividad de broker, los conflictos de interes estructurales incluyen:

- **Modelo de ejecucion:** cualquier broker con componente **B-Book / internalizado** toma el otro lado de la posicion del cliente — lo que el cliente pierde es ganancia para el broker y viceversa.
- **Componente A-Book:** el broker cobra markup sobre el spread del LP — incentivo a maximizar volumen, no resultado del cliente.
- **Bonos y promociones:** incentivo a que el cliente deposite y opere mas.
- **Relaciones con IB/afiliados:** comision a intermediarios por volumen genera incentivos a sobre-trading.
- **Productos de yield (Vault):** gestion de float del broker sobre fondos de clientes.
- **Publicacion de research o analisis:** el broker o su equipo puede tener posiciones en los activos comentados.

---

## 3. Principio rector

Neomaaa Ltd **no pretende eliminar** todos los conflictos de interes (estructuralmente imposible en broker retail). El compromiso es:

1. **Identificarlos** proactivamente.
2. **Gestionarlos** mediante controles internos (separacion de funciones, monitoreo, reglas de best execution).
3. **Divulgarlos** al cliente con transparencia.
4. **Tratar justamente** al cliente a pesar del conflicto estructural.

Este enfoque es **estandar en la industria retail**; el broker que afirme "cero conflicto" esta desinformando.

---

## 4. Conflictos identificados y controles

### 4.1 Modelo hibrido ECN/STP con internalizacion parcial
- **Conflicto:** la parte internalizada hace que la perdida del cliente sea ganancia del broker.
- **Control:** politica de **best execution** (`legal/order-execution-policy.md`). El dealing desk (bajo supervision del Head of Dealing y del Compliance Officer) no manipula precios: garantiza que el precio recibido por el cliente sea **comparable al precio de mercado** al momento de la ejecucion.
- **Supervision:** Compliance audita ejecuciones mensualmente. El cliente puede solicitar **execution report** de cualquier operacion.

### 4.2 Markup sobre spread en A-Book
- **Conflicto:** incentivo a incrementar el markup.
- **Control:** el markup esta publicado en la pagina de especificaciones de cuenta. No puede aumentarse unilateralmente sin notificacion previa.

### 4.3 Bonos y promociones
- **Conflicto:** incentivo a que el cliente deposite o opere mas de lo que conviene a su situacion financiera.
- **Control:** los bonos tienen **terminos claros y documentados** (`legal/bonus-terms.md`). Ningun agente de sales puede ocultar los requisitos de turnover. Disclosures obligatorios en toda comunicacion comercial.

### 4.4 Incentivos a IB / afiliados
- **Conflicto:** el IB gana por volumen del cliente, no por resultado.
- **Control:** programa de afiliados con terminos publicos (`legal/affiliate-terms.md`), KYC a los propios IBs, y prohibicion de consejos de trading no calificado por parte de IBs.

### 4.5 Vault Yield System
- **Conflicto:** el broker gestiona el float del pool Vault y puede obtener diferencial entre yield generado y yield pagado al cliente.
- **Control:** el yield publicado y los terminos del producto son claros (`legal/vault-yield-terms.md`). Segregacion de wallets entre trading flow y Vault pool.

### 4.6 Empleados con posiciones propias
- **Conflicto:** un empleado con acceso a informacion sensible podria operar a favor de sus propias posiciones.
- **Control:** politica interna de **personal trading** — los empleados con acceso a flow o decisiones sobre ejecucion requieren registro de sus cuentas personales y pueden estar sujetos a blackout periods o pre-aprobacion de operaciones. La politica exacta de personal trading esta definida por Compliance y forma parte del onboarding del empleado.

### 4.7 Outsourcing a proveedores con intereses cruzados
- **Conflicto:** proveedores de liquidez, PSPs o tech providers pueden tener intereses en dirigir flow o imponer comisiones.
- **Control:** due diligence sobre proveedores, contratos con clausulas de best execution y non-discrimination, rotacion de proveedores si se detecta sesgo.

### 4.8 Dealing desk — equipo interno
- **Conflicto:** el dealing desk observa todo el flow del cliente y podria usar ese conocimiento para internalizar selectivamente.
- **Control:** **Chinese wall** con sales/marketing (el dealing no comparte info de clientes con comercial salvo casos escalados formalmente). Logs de decisiones de routing auditables por Compliance.

---

## 5. Procedimiento para identificar nuevos conflictos

### 5.1 Responsabilidades
- **Cada empleado** reporta a Compliance cualquier situacion que pueda constituir conflicto de interes (nuevo producto, nuevo proveedor, relacion personal con cliente, etc.).
- **El Compliance Officer** mantiene el **registro de conflictos** actualizado.
- **Principals** revisan el registro semestralmente.
- **Board / ownership** aprueba cualquier conflicto material antes de su materializacion.

### 5.2 Registro de conflictos
El registro se mantiene en el repositorio interno de Compliance definido por politica. Debe contener:
- Descripcion del conflicto.
- Partes involucradas.
- Clientes afectados (si aplica).
- Controles en lugar.
- Fecha de identificacion, revision y cierre.

---

## 6. Divulgacion al cliente

La Empresa **divulga los conflictos de interes estructurales** en:

- **Client Agreement** (`legal/client-agreement.md`) — marco general.
- **Order Execution Policy** (`legal/order-execution-policy.md`) — ejecucion y routing.
- **Website** neomaaa.com — pagina "About" y "Legal Documentation".
- **Materiales de marketing** — disclaimers estandar en cualquier promocion.

El cliente tiene derecho a solicitar **informacion adicional** sobre conflictos que puedan afectar una operacion concreta. Respuesta: `legal@neomaaa.com` o `compliance@neomaaa.com`.

---

## 7. Escalamiento y resolucion

Si un cliente considera que un conflicto de interes no declarado afecto su operacion:

1. Reclamo formal via `legal/complaint-handling.md`.
2. Investigacion por Compliance con revision de logs de ejecucion, comunicaciones, y decisiones de routing.
3. Resolucion: si el reclamo es legitimo, compensacion + ajuste de controles. Si no es legitimo, respuesta razonada al cliente.
4. Si el cliente no queda satisfecho: escalamiento interno al Head of Compliance y a los Principals.
5. Via ultima: reclamo a la AOFA (regulador).

---

## 8. Formacion interna

Todos los empleados en funciones comerciales, dealing, support y compliance reciben **formacion anual obligatoria** sobre conflictos de interes, con examen y registro. Nuevos empleados: formacion en onboarding (ver `hiring/onboarding-5-dias.md`).

---

## 9. Revision de la politica

Esta politica se revisa al menos **anualmente** o cuando haya cambios materiales en productos, estructura o regulacion. Responsable: Compliance Officer.

---

## 10. Contacto

- Dudas o reportes internos: `compliance@neomaaa.com`
- Disputas formales: `legal@neomaaa.com`
- Direccion: Hamchako, Mutsamudu, Anjouan, Union of Comoros.

---

[PENDIENTE: texto legal final desde neomaaa.com/about/legal-documentation]
[Politica exacta de personal trading, ubicacion del registro de conflictos y lista completa de proveedores con DD completo: definidas por Compliance segun politica interna.]
