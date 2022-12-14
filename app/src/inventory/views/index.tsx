import { ReactElement } from "react";
import

const Inventory = () => {
  const rows = data!.items!.map((item) => (
    <tr
      className="cursor-pointer hover:bg-gray-50"
      key={item!.id}
      id={item!.id as string}
      onClick={(e) => {
        setSingleItem(true);
        getItem({
          variables: {
            id: e.currentTarget.id,
          },
        });
      }}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="text-sm text-gray-900 font-mono">{item!.code}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{item!.name}</div>
        <div className="text-sm text-gray-500">{item!.brand!.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item!.createdAt}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item!.updatedAt}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div
          className="w-8 h-6 border border-green-300"
          ref={(node) => {
            const map = getMap();
            if (node) {
              map.set(item.id, node);
            } else {
              map.delete(item.id);
            }
          }}
          onClick={(e) => handleClick(e, item as Item)}
        >
          <DotsHorizontalIcon
            className="w-5 h-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </div>
      </td>
    </tr>
  ));

  const columns = [
    { key: 0, title: "Identificador" },
    { key: 1, title: "Artículo" },
    { key: 2, title: "Estado" },
    { key: 3, title: "Fecha incorporación" },
    { key: 4, title: "Última modificación" },
    { key: 4, title: "" },
  ];

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900">Hola</h1>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="hidden sm:block ml-3">
              <button
                type="button"
                // onClick={() => setSingleItem(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Exportar
              </button>
            </span>

            <span className="sm:ml-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Crear artículo
              </button>
            </span>
          </div>
        </div>
      </header>
      <main>
        <Table rows={rows} columns={columns} />
      </main>
    </>
  );
};

export default Inventory;

Inventory.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Inventario">{page}</Layout>;
};
