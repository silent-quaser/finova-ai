"use client";

export default function TransactionFilters({
  search,
  setSearch,
  category,
  setCategory,
  type,
  setType,
}) {
  return (
    <div className="glass rounded-3xl p-6">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        >
          <option value="">
            All Categories
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Salary">
            Salary
          </option>

          <option value="Entertainment">
            Entertainment
          </option>

          <option value="Transport">
            Transport
          </option>

          <option value="Shopping">
            Shopping
          </option>

        </select>

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value
            )
          }
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        >
          <option value="">
            All Types
          </option>

          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>

        </select>

      </div>

    </div>
  );
}