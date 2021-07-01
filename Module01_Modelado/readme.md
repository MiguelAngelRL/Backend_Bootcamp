# Módulo 01 - Laboratorio Modelado

De cara a que el rendimiento de la aplicación sea alto y que las páginas carguen rápido, el [modelo](https://github.com/MiguelAngelRL/Backend_Bootcamp/blob/main/Module01_Modelado/modelado.pdf) propuesto hace uso intensivo del **Subset Pattern**, insertando en las colecciones que representan cada página, los datos que necesitan de otras colecciones para presentar la información.

Aunque desde el punto de vista del código sea algo más engorroso el controlar que los datos se incluyan o actualicen en otras colecciones al crear o modificar el master data de una colección, lo agradeceremos a la hora del rendimiento en producción.

Para el caso especial de la página principal **Home**, donde se tienen que mostrar los 5 últimos videos tanto en general como de cada categoría principal, así como los más visualizados, se ha creado una estructura que se podría considerar como **Buckets** y que se implementará en código como ***arrays circulares*** para el caso de los más recientes y como un ***proceso batch*** para el caso de los más vistos, al no ser un dato crítico que necesite ser mostrado al momento. Como tampoco esta página inicial es super crítica, en vez de los arrays circulares también se podría optar por usar el proceso batch también para los más recientes, con lo que ahorramos en tiempo de proceso, pero habría que estudiar bien qué conviene más.

Para el caso de las temáticas, se ha establecido un array de string de cara a aplicar la aproximación de **ancestros** del **Tree Pattern**, para facilitar la navegación tipo breadcrumb.

Finalmente, para manejar el caso de las subscripciones o cursos comprados, se ha establecido una propiedad en las lecciones para indicar si es privada (valor *true*) o no. Si el código detecta que una lección es privada, comprobará si el usuario logado es subscriptor o si tiene comprado algún curso al que pertenezca esa lección, permitiendo acceder a ella o no en base a dicha comprobación.