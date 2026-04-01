import type { Metadata } from "next";
import {
  GaeaBackground,
  GaeaSiteFooter,
  GaeaSiteHeader,
} from "../components/gaea-site-chrome";
import { ContractContent } from "./contract-content";
import {
  getLocaleFromSearchParams,
  type SearchParamsLike,
} from "../lib/i18n";

export const metadata: Metadata = {
  title: "Contract",
  description:
    "XENØR contract page: canonical contract, explicit launch context, verification routes, and official market references.",
};

type ContractPageProps = {
  searchParams?: Promise<SearchParamsLike>;
};

export default async function ContractPage({ searchParams }: ContractPageProps) {
  const locale = getLocaleFromSearchParams(
    searchParams ? await searchParams : undefined
  );

  return (
    <main className="gaea-home gaea-subpage contract-page">
      <GaeaBackground />
      <GaeaSiteHeader locale={locale} />
      <ContractContent locale={locale} />
      <GaeaSiteFooter locale={locale} />
    </main>
  );
}
