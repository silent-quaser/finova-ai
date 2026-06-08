const knowledge = {
  savings: [
    "Improving savings consistency and reducing unnecessary monthly expenses can significantly strengthen long-term financial stability.",
    "Automating monthly savings transfers improves long-term financial discipline.",
    "Small reductions in recurring expenses can create large annual savings improvements.",
    "Building savings habits early creates stronger financial flexibility.",
    "Maintaining separate emergency and investment savings improves financial organization.",
  ],

  budgeting: [
    "Maintaining a category-based monthly budget improves financial control.",
    "Weekly expense tracking is often more effective than monthly reviews alone.",
    "Budgeting becomes easier when financial goals are clearly defined.",
    "Budget discipline reduces impulsive spending behavior.",
    "Effective budgeting balances necessities, savings, and controlled lifestyle spending.",
  ],

  investing: [
    "Diversified long-term investments generally reduce financial risk exposure.",
    "Consistent investing often outperforms emotional market timing.",
    "Long-term investing benefits significantly from compound growth.",
    "Investment portfolios should align with risk tolerance and financial goals.",
    "Diversification across asset categories improves portfolio stability.",
  ],

  crypto: [
    "Cryptocurrency investments are highly volatile and require careful risk management.",
    "Never invest money into crypto that you cannot afford to lose.",
    "Crypto markets can experience rapid emotional swings and price instability.",
    "Diversification is important when investing in speculative assets.",
    "Long-term investing is generally safer than emotional short-term crypto trading.",
  ],

  debt: [
    "Prioritize clearing high-interest debt before aggressive investing.",
    "Debt repayment becomes easier when discretionary expenses are controlled.",
    "Avoid accumulating additional high-interest liabilities unnecessarily.",
    "Financial stability improves significantly after reducing debt obligations.",
    "Debt management requires consistent budgeting discipline.",
  ],

  student: [
    "Students should prioritize savings discipline and skill development.",
    "Tracking small daily expenses helps students avoid financial leakage.",
    "Students benefit from controlled lifestyle spending during college.",
    "Learning financial discipline early creates long-term advantages.",
    "Internships and freelancing improve financial flexibility for students.",
  ],

  emergency: [
    "Emergency funds should ideally cover at least 3–6 months of expenses.",
    "Emergency savings improve financial resilience during uncertain situations.",
    "Maintaining liquid savings reduces dependency on debt during emergencies.",
    "Unexpected expenses become easier to manage with emergency reserves.",
    "Emergency funds provide psychological and financial stability.",
  ],

  stocks: [
    "Long-term stock investing generally outperforms emotional short-term trading.",
    "Diversified stock portfolios reduce market-specific risks.",
    "Market volatility should not dominate long-term investing strategies.",
    "Disciplined investing is usually more effective than frequent speculation.",
    "Long-term investors often benefit from compound market growth.",
  ],

  mutualfunds: [
    "Mutual funds and SIPs support disciplined long-term investing.",
    "SIPs reduce emotional investing behavior through consistency.",
    "Mutual funds provide diversification benefits for beginner investors.",
    "Long-term SIP investing benefits from compounding growth.",
    "Diversified mutual funds generally reduce concentrated investment risk.",
  ],

  insurance: [
    "Insurance protects long-term financial stability during emergencies.",
    "Health insurance reduces medical financial risk exposure.",
    "Insurance planning is an essential part of financial management.",
    "Emergency healthcare costs can heavily impact savings without insurance.",
    "Financial resilience improves with proper insurance coverage.",
  ],

  salary: [
    "Improving income through skills and experience accelerates financial growth.",
    "Career development and financial growth are strongly connected.",
    "Higher income should be combined with disciplined spending habits.",
    "Continuous learning often improves long-term salary potential.",
    "Income diversification improves financial security.",
  ],

  sidehustle: [
    "Side income streams improve financial resilience and savings capacity.",
    "Freelancing can create scalable secondary income opportunities.",
    "Digital skills enable modern side-hustle opportunities.",
    "Multiple income streams reduce dependency on a single salary source.",
    "Side projects can accelerate financial independence goals.",
  ],

  retirement: [
    "Early investing significantly improves retirement wealth through compounding.",
    "Long-term consistency matters more than aggressive short-term investing.",
    "Retirement planning should begin as early as possible.",
    "Compound growth rewards disciplined long-term investors.",
    "Financial independence depends heavily on long-term planning.",
  ],

  overspending: [
    "Tracking discretionary expenses helps reduce overspending patterns.",
    "Subscription audits often reveal hidden financial leakage.",
    "Controlled lifestyle inflation improves long-term financial sustainability.",
    "Monthly spending limits improve financial discipline.",
    "Impulse spending reduces long-term wealth accumulation potential.",
  ],

  taxes: [
    "Proper tax planning improves overall financial efficiency.",
    "Organized expense tracking simplifies tax management.",
    "Long-term investment planning can improve tax optimization.",
    "Maintaining financial records improves tax filing accuracy.",
    "Financial discipline reduces tax-related stress.",
  ],

  banking: [
    "Maintaining healthy banking habits improves financial stability.",
    "Digital banking tools improve expense tracking efficiency.",
    "Secure banking practices reduce fraud exposure.",
    "Multiple savings accounts can improve financial organization.",
    "Banking discipline supports long-term financial management.",
  ],

  scams: [
    "Never share OTPs, passwords, or banking credentials online.",
    "Financial scams often create false urgency or unrealistic promises.",
    "Verify suspicious payment requests carefully before transferring money.",
    "UPI and phishing scams are increasingly common online.",
    "Strong cybersecurity habits protect financial assets.",
  ],

  passiveincome: [
    "Passive income streams improve long-term financial flexibility.",
    "Dividend investing can contribute to passive income growth.",
    "Digital products and scalable skills support passive income generation.",
    "Financial independence often depends on income diversification.",
    "Passive income requires long-term consistency and patience.",
  ],

  entrepreneurship: [
    "Business growth requires disciplined financial management.",
    "Entrepreneurship involves balancing risk and long-term sustainability.",
    "Cash flow management is critical for startup stability.",
    "Scalable skills improve entrepreneurial opportunities.",
    "Successful businesses prioritize sustainable growth strategies.",
  ],

  inflation: [
    "Inflation gradually reduces purchasing power over time.",
    "Long-term investing helps protect wealth against inflation.",
    "Budget adjustments are important during inflationary periods.",
    "Controlled spending becomes more important during rising inflation.",
    "Financial planning should account for inflation risks.",
  ],

  productivity: [
    "Financial productivity improves through disciplined daily habits.",
    "Consistent routines improve budgeting and savings discipline.",
    "Time management often influences income growth opportunities.",
    "Productivity improvements can accelerate career development.",
    "Financial growth benefits from behavioral consistency.",
  ],

  financialfreedom: [
    "Financial freedom is built through discipline, consistency, and investing.",
    "Long-term wealth usually depends more on habits than income spikes.",
    "Controlled spending and consistent investing accelerate financial independence.",
    "Financial independence requires patience and long-term planning.",
    "Sustainable wealth accumulation depends on disciplined financial behavior.",
  ],
};

function getRandom(
  arr
) {
  return arr[
    Math.floor(
      Math.random() *
        arr.length
    )
  ];
}

function getFinancialResponse(
  message
) {
  const text =
    message.toLowerCase();

  if (
    text.includes("save") ||
    text.includes("saving")
  )
    return getRandom(
      knowledge.savings
    );

  if (
    text.includes("budget")
  )
    return getRandom(
      knowledge.budgeting
    );

  if (
    text.includes("invest")
  )
    return getRandom(
      knowledge.investing
    );

  if (
    text.includes("crypto") ||
    text.includes("bitcoin")
  )
    return getRandom(
      knowledge.crypto
    );

  if (
    text.includes("debt") ||
    text.includes("loan")
  )
    return getRandom(
      knowledge.debt
    );

  if (
    text.includes("student")
  )
    return getRandom(
      knowledge.student
    );

  if (
    text.includes("emergency")
  )
    return getRandom(
      knowledge.emergency
    );

  if (
    text.includes("stock")
  )
    return getRandom(
      knowledge.stocks
    );

  if (
    text.includes("sip") ||
    text.includes("mutual")
  )
    return getRandom(
      knowledge.mutualfunds
    );

  if (
    text.includes("insurance")
  )
    return getRandom(
      knowledge.insurance
    );

  if (
    text.includes("salary") ||
    text.includes("income")
  )
    return getRandom(
      knowledge.salary
    );

  if (
    text.includes("freelance") ||
    text.includes("side hustle")
  )
    return getRandom(
      knowledge.sidehustle
    );

  if (
    text.includes("retirement")
  )
    return getRandom(
      knowledge.retirement
    );

  if (
    text.includes("spending") ||
    text.includes("overspending")
  )
    return getRandom(
      knowledge.overspending
    );

  if (
    text.includes("tax")
  )
    return getRandom(
      knowledge.taxes
    );

  if (
    text.includes("bank")
  )
    return getRandom(
      knowledge.banking
    );

  if (
    text.includes("scam") ||
    text.includes("fraud") ||
    text.includes("otp")
  )
    return getRandom(
      knowledge.scams
    );

  if (
    text.includes("passive income")
  )
    return getRandom(
      knowledge.passiveincome
    );

  if (
    text.includes("startup") ||
    text.includes("business") ||
    text.includes("entrepreneur")
  )
    return getRandom(
      knowledge.entrepreneurship
    );

  if (
    text.includes("inflation")
  )
    return getRandom(
      knowledge.inflation
    );

  if (
    text.includes("productive") ||
    text.includes("productivity")
  )
    return getRandom(
      knowledge.productivity
    );

  if (
    text.includes("financial freedom") ||
    text.includes("rich")
  )
    return getRandom(
      knowledge.financialfreedom
    );

  if (
    text.includes("hello") ||
    text.includes("hi")
  ) {
    return "Hello! I’m Finova AI. Ask me anything about savings, investing, budgeting, financial discipline, debt management, career growth, or wealth building.";
  }

  return "Maintaining disciplined spending habits, consistent savings, and long-term investing strategies are key principles of financial stability.";
}

module.exports = {
  getFinancialResponse,
};