import { LockClosedIcon, XCircleIcon } from "@heroicons/react/solid";
import { Formik, Field, Form, FormikErrors } from "formik";
import { useRouter } from "next/dist/client/router";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface Values {
  email: string;
  password: string;
}

interface Errors extends Values {}

const initialValues = {
  email: "",
  password: "",
};

export default function register() {
  const [register, { loading }] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = async (
    values: Values,
    { setErrors }: { setErrors: (errors: FormikErrors<Values>) => void }
  ) => {
    const response = await register({
      variables: {
        options: values,
      },
    });
    if (response.data?.register.errors) {
      setErrors(toErrorMap(response.data.register.errors));
    } else if (response.data?.register.user) {
      router.push("/inventory");
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register
            </h2>
          </div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting, errors }) => {
              return (
                <>
                  {Object.keys(errors).length > 0 && (
                    <div
                      className="block text-sm text-left text-red-600 bg-red-500 bg-opacity-10 h-12 flex items-center p-4 rounded-md"
                      role="alert"
                    >
                      <div className="flex items-center">
                        <XCircleIcon className="h-5 w-5 text-red-400 mr-4" />
                        <p className="text-red-600">
                          Se encontraron estos errores en tu formulario
                          {Object.values(errors).map((error) => (
                            <li>{error}</li>
                          ))}
                        </p>
                      </div>
                    </div>
                  )}
                  <Form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div>
                        <label htmlFor="email" className="sr-only">
                          Email address
                        </label>
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Email address"
                        />
                      </div>

                      <div>
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Password"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <LockClosedIcon
                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            aria-hidden="true"
                          />
                        </span>
                        Registrarme
                      </button>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}
