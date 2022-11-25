import { FolderAddIcon } from "@heroicons/react/outline";

type Props = {
  rows: JSX.Element[];
  columns: Array<{ key: number; title: string }>;
};

export const Table = ({ rows, columns }: Props) => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col">
        <div className="py-4">
          <h2 className="font-medium text-gray-900">Todos los elementos</h2>
        </div>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-96">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              {rows.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {columns.map((columnName, id) => (
                        <th
                          key={id}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {columnName.title}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {rows}
                  </tbody>
                </table>
              ) : (
                <div className="text-center bg-white py-20 leading-7">
                  <FolderAddIcon className="h-12 w-12 text-gray-400 inline-block" />
                  <h2 className="text-md">No hay elementos</h2>
                  <p className="text-gray-500 font-light">
                    Comienza creando los elementos
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
