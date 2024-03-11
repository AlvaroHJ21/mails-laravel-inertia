import { useEffect, FormEventHandler, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Button from "@/Components/Button";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="absolute left-0 right-0 grid w-24 h-24 m-auto border rounded-full bg-cielo-alba place-content-center -top-12">
                <img src="/logo.png" alt="" width="48" />
            </div>

            <h1 className="mb-6 text-xl font-bold text-center text-azul-marino">
                Plataforma de contactabilidad y gestión de contactos
            </h1>

            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="input-group">
                        <span className="input-group-icon">
                            <i className="fa fa-user"></i>
                        </span>
                        <input
                            type="text"
                            name="username"
                            className="input"
                            placeholder="Nombre de usuario"
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                        />
                    </label>
                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mb-3">
                    <label className="relative input-group">
                        <span className="input-group-icon">
                            <i className="fa fa-key"></i>
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="input"
                            placeholder="Contraseña"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <button
                            type="button"
                            className="absolute top-0 bottom-0 m-auto right-4"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <i className="fa fa-eye-slash"></i>
                            ) : (
                                <i className="fa fa-eye"></i>
                            )}
                        </button>
                    </label>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="text-sm text-gray-600 ms-2">
                            Remember me
                        </span>
                    </label>
                </div> */}

                {/* {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )} */}

                {/* <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton> */}
                <Button className="w-full" isLoading={processing}>
                    Ingresar
                </Button>
            </form>
        </GuestLayout>
    );
}
