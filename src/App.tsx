import { Layout } from "@/components/Layout";
import { useRoute } from "@/lib/router";
import AbrirEmpresaPage from "@/pages/AbrirEmpresa";
import HomePage from "@/pages/Home";
import InstitucionalPage from "@/pages/Institucional";
import NotFoundPage from "@/pages/NotFound";
import PrazosPage from "@/pages/Prazos";
import PrivacidadePage from "@/pages/Privacidade";
import SimuladorPage from "@/pages/Simulador";
import UnidadePage from "@/pages/Unidade";

export default function App() {
  const path = useRoute();

  let page = <NotFoundPage />;

  if (path === "/") {
    page = <HomePage />;
  } else if (path === "/abrir-empresa") {
    page = <AbrirEmpresaPage />;
  } else if (path === "/simulador") {
    page = <SimuladorPage />;
  } else if (path === "/prazos-fiscais") {
    page = <PrazosPage />;
  } else if (path === "/institucional") {
    page = <InstitucionalPage />;
  } else if (path === "/politica-de-privacidade") {
    page = <PrivacidadePage />;
  } else if (path === "/unidades/junqueiropolis") {
    page = <UnidadePage unitId="junqueiropolis" />;
  } else if (path === "/unidades/dracena") {
    page = <UnidadePage unitId="dracena" />;
  }

  return <Layout path={path}>{page}</Layout>;
}
