import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  ITEMS,
  CREATE_ITEM,
  CATEGORIES,
  BRANDS,
  CREATE_BRAND,
  CREATE_CATEGORY,
  ITEM,
  DELETE_ITEM,
} from "./queries";
import { Item, Items, Options } from "./interfaces";
import { Dialog, Transition } from "@headlessui/react";
import { FolderAddIcon } from "@heroicons/react/outline";
import React, { Fragment, useState, useReducer } from "react";
import CreatableSelect from "react-select/creatable";
import { actions, reducer, initialState } from "./reducers";
import { MenuComponent } from "./components";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // MUTATIONS
  const [createItem, { loading: createItemLoading }] = useMutation(
    CREATE_ITEM,
    {
      refetchQueries: [ITEMS],
      onCompleted(data) {
        dispatch({
          type: actions.submittedForm,
          payload: data.createItem.code,
        });
      },
    }
  );

  const [deteleItem, { loading: deleteItemLoading }] = useMutation(
    DELETE_ITEM,
    { refetchQueries: [ITEMS] }
  );

  const [createBrand, { loading: createBrandLoading }] = useMutation(
    CREATE_BRAND,
    { refetchQueries: [BRANDS] }
  );

  const [createCategory, { loading: createCategoryLoading }] =
    useMutation(CREATE_CATEGORY);

  // QUERIES
  const { loading, error, data } = useQuery<{ items: Item[] }>(ITEMS, {
    pollInterval: 60000,
  });

  const [getBrands, { loading: brandLoading, data: dataBrand }] =
    useLazyQuery(BRANDS);

  const [getItem, { data: itemData }] = useLazyQuery<{ item: Item }>(ITEM);

  const [getCategories, { loading: categoryLoading, data: categoryData }] =
    useLazyQuery(CATEGORIES);

  // HANDLES
  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    dispatch({
      type: actions.fieldsChanged,
      fieldName: e.currentTarget.name,
      payload: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>): void => {
    e.preventDefault();
    createItem({
      variables: {
        name: name,
        category: category?.value,
        brand: brand?.value,
        model: model,
      },
    });
  };

  const { name, brand, category, model, code } = state;

  const [open, setOpen] = useState<boolean>(false);
  const [singleItem, setSingleItem] = useState<boolean>(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const rows = data!.items.map((item: Item) => (
    <tr
      className="cursor-pointer hover:bg-gray-50"
      key={item.id}
      id={item.id}
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
        <div className="text-sm text-gray-900 font-mono">{item.code}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{item.name}</div>
        <div className="text-sm text-gray-500">{item.brand.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.createdAt}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.updatedAt}
      </td>
    </tr>
  ));

  const transformData = (data: Items): Options => {
    return data?.map((item: Item) => ({
      value: item.id,
      label: item.name,
    }));
  };

  return (
    <div className="h-screen flex flex-col">
      <Transition.Root show={singleItem} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setSingleItem}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Información del artículo
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Detalles del artículo
                    </p>
                  </div>
                  <MenuComponent />
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Nombre
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {itemData?.item.name}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Marca
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {itemData?.item.brand.name}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Modelo
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {itemData?.item.model}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Categoría
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {itemData?.item.category.name}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Estado
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Activo
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Observaciones
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                        anim incididunt cillum culpa consequat. Excepteur qui
                        ipsum aliquip consequat sint. Sit id mollit nulla mollit
                        nostrud in ea officia proident. Irure nostrud pariatur
                        mollit ad adipisicing reprehenderit deserunt qui eu.
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                onSubmit={handleSubmit}
              >
                {code ? (
                  <div className="px-4 py-5 bg-white sm:p-6 text-center">
                    <svg
                      width="49"
                      height="48"
                      viewBox="0 0 49 48"
                      className="inline-block mb-2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="24.5" cy="24" r="24" fill="#D9F9E6" />
                      <path
                        d="M18.2071 24.7929C17.8166 24.4024 17.1834 24.4024 16.7929 24.7929C16.4024 25.1834 16.4024 25.8166 16.7929 26.2071L18.2071 24.7929ZM21 29L20.2929 29.7071C20.6834 30.0976 21.3166 30.0976 21.7071 29.7071L21 29ZM31.7071 19.7071C32.0976 19.3166 32.0976 18.6834 31.7071 18.2929C31.3166 17.9024 30.6834 17.9024 30.2929 18.2929L31.7071 19.7071ZM16.7929 26.2071L20.2929 29.7071L21.7071 28.2929L18.2071 24.7929L16.7929 26.2071ZM21.7071 29.7071L31.7071 19.7071L30.2929 18.2929L20.2929 28.2929L21.7071 29.7071Z"
                        fill="#43936C"
                      />
                    </svg>
                    <h2 className="text-lg mb-4">Artículo creado</h2>
                    <h2 className="font-mono text-gray-900 mb-5 bg-gray-100 rounded-lg inline-block py-2 px-3 border-2 border-gray-200 ">
                      {code}
                    </h2>
                    <p className="text-sm	text-gray-500 mb-4">
                      Este es el código. Pegalo en el artículo para llevar un
                      registro.
                    </p>
                    <button
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      onClick={() => {
                        dispatch({
                          type: actions.reset,
                        });
                        setOpen(false);
                      }}
                    >
                      <span>Volver al inventario</span>
                    </button>
                  </div>
                ) : (
                  <form className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            required
                            name="name"
                            id="name"
                            value={name}
                            onChange={handleChange}
                            autoComplete="name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="brand"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Marca
                          </label>
                          <CreatableSelect
                            options={transformData(dataBrand?.brands)}
                            onFocus={() => getBrands()}
                            isDisabled={createBrandLoading}
                            placeholder="Selecciona una marca..."
                            isLoading={brandLoading || createBrandLoading}
                            loadingMessage={() => "Cargando marcas"}
                            onChange={(option: any) => {
                              dispatch({
                                type: actions.selectChanged,
                                fieldName: "brand",
                                payload: {
                                  value: option.value,
                                  label: option.label,
                                },
                              });
                            }}
                            onCreateOption={(inputValue) => {
                              createBrand({
                                variables: {
                                  name: inputValue,
                                },
                              }).then((data) => {
                                dispatch({
                                  type: actions.fieldsChanged,
                                  fieldName: "brand",
                                  payload: {
                                    value: data.data.createBrand.id,
                                    label: data.data.createBrand.name,
                                  },
                                });
                              });
                            }}
                            value={brand}
                          ></CreatableSelect>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="model"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Modelo
                          </label>
                          <input
                            required
                            type="text"
                            name="model"
                            id="model"
                            value={model}
                            onChange={handleChange}
                            autoComplete="model"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Categoría
                          </label>
                          <CreatableSelect
                            options={transformData(categoryData?.categories)}
                            onFocus={() => getCategories()}
                            isDisabled={createCategoryLoading}
                            placeholder="Selecciona una categoría..."
                            loadingMessage={() => "Cargando categorías"}
                            isLoading={categoryLoading || createCategoryLoading}
                            onChange={(option: any) => {
                              dispatch({
                                type: actions.selectChanged,
                                fieldName: "category",
                                payload: {
                                  value: option.value,
                                  label: option.label,
                                },
                              });
                            }}
                            onCreateOption={(inputValue) => {
                              createCategory({
                                variables: {
                                  name: inputValue,
                                },
                              }).then((data) => {
                                dispatch({
                                  type: actions.fieldsChanged,
                                  fieldName: "category",
                                  payload: {
                                    value: data.data.createCategory.id,
                                    label: data.data.createCategory.name,
                                  },
                                });
                              });
                            }}
                            value={category}
                          ></CreatableSelect>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="observaciones"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Observaciones
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="observaciones"
                              name="observaciones"
                              rows={3}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Esta dañado en su..."
                              defaultValue={""}
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            Una descripción corta del artículo, si presenta
                            alguna falla o si viene con algún accesorio.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={createItemLoading}
                        className={`relative w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white ${
                          createItemLoading ? "loading" : null
                        } hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm`}
                      >
                        <div className="spinner" />
                        <span>Crear</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="shadow-sm relative z-1">
        <div className="lg:flex lg:items-center lg:justify-between container mx-auto py-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Inventario
            </h2>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="hidden sm:block ml-3">
              <button
                type="button"
                onClick={() => setSingleItem(true)}
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
      </div>
      <div className="bg-gray-100 pt-10 h-full">
        <div className="container mx-auto">
          <div className="flex flex-col">
            <div className="py-4">
              <h2 className="font-medium text-gray-900">Todos los elementos</h2>
            </div>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  {data!.items.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Identificador
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Artículo
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Estado
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Fecha incorporación
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Última modificación
                          </th>
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
      </div>
    </div>
  );
}

export default App;
