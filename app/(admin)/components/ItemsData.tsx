import { UserPlus, Home } from "lucide-react";

export const sideBarData = {
  teams: {
    name: "Muni Sanji",
    description: "Mesa de partes virtual",
    logo: "/document.svg",
  },
  navMain: {
    administrador: [
      {
        title: "Inicio",
        url: "/admin",
        icon: Home,
      },
      {
        title: "Oficinas",
        url: "#",
        icon: UserPlus,
        isActive: true,
        items: [
          {
            title: "Oficinas",
            url: "/admin/office",
          },
          {
            title: "Registrar Oficina",
            url: "/admin/office/create",
          },
        ],
      },
      {
        title: "Usuarios",
        url: "#",
        icon: UserPlus,
        isActive: true,
        items: [
          {
            title: "Usuarios",
            url: "/admin/usuarios",
          },
          {
            title: "Registrar Usuario",
            url: "/admin/user/create",
          },
        ],
      },
    ],

    mesa_de_partes: [
      {
        title: "Inicio",
        url: "/private/attendance",
        icon: Home,
      },
      {
        title: "Asistencia",
        url: "#",
        icon: UserPlus,
        isActive: true,
        items: [
          {
            title: "Llamar lista",
            url: "/private/attendance",
          },
        ],
      },
    ],

    funcionario: [
      {
        title: "Página Principal",
        url: "/",
        icon: Home,
      },
    ],
  },
};
