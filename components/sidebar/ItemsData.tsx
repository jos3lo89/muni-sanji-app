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
        isActive: false,
        items: [
          {
            title: "Usuarios",
            url: "/admin/user",
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
        url: "/reception-desk",
        icon: Home,
      },
      {
        title: "Documentos",
        url: "#",
        icon: UserPlus,
        isActive: true,
        items: [
          {
            title: "entrantes",
            url: "#",
          },
        ],
      },
    ],

    funcionario: [
      {
        title: "Inicio",
        url: "/manager",
        icon: Home,
      },
      {
        title: "Documentos",
        url: "#",
        icon: UserPlus,
        isActive: true,
        items: [
          {
            title: "entrantes",
            url: "#",
          },
        ],
      },
    ],
  },
};
