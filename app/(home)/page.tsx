import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";

interface HomeProps {
  searchParams: {
    year?: string;
    month?: string;
  };
}

const Home = async ({ searchParams: { year, month } }: HomeProps) => {
  const currentDate = new Date();
  const monthIsInvalid = !month || !isMatch(month, "MM");
  const yearIsInvalid = !year || !isMatch(year, "yyyy");

  if (monthIsInvalid || yearIsInvalid) {
    redirect(
      `?year=${currentDate.getFullYear()}&month=${String(
        currentDate.getMonth() + 1,
      ).padStart(2, "0")}`,
    );
  }

  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const dashboard = await getDashboard(year!, month!);
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6 xs:justify-between xs:overflow-visible xs:p-[1rem]">
        <div className="flex justify-between xs:flex-col">
          <h1 className="mb-3 text-2xl font-bold xs:text-center">Dashboard</h1>
          <div className="flex items-center gap-3 xs:justify-evenly">
            <AiReportButton
              month={month!}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan !== "premium"
              }
            />
            <TimeSelect />
          </div>
        </div>
        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden xs:flex xs:flex-col xs:overflow-visible">
          <div className="flex flex-col gap-6 overflow-hidden xs:overflow-visible">
            <SummaryCards
              year={year!}
              month={month!}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden xs:flex xs:flex-col xs:overflow-visible">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
