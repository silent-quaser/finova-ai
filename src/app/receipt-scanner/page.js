"use client";

import {
  useState,
} from "react";

import {
  Upload,
  ScanLine,
  Receipt,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageWrapper from "../../components/ui/PageWrapper";

import toast from "react-hot-toast";

import api from "../../services/api";

export default function ReceiptScannerPage() {
  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [saving, setSaving] =
    useState(false);

  function handleUpload(e) {
    const file =
      e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

    setResult(null);
  }

  async function scanReceipt() {
    if (!image) {
      toast.error(
        "Please upload a receipt image"
      );

      return;
    }

    setLoading(true);

    try {
      const Tesseract =
        (
          await import(
            "tesseract.js"
          )
        ).default;

      const {
        data: { text },
      } =
        await Tesseract.recognize(
          image,
          "eng"
        );

      console.log(text);

      let vendor =
        "Unknown Vendor";

      let category =
        "Shopping";

      let amount =
        "0";

      const lowerText =
        text.toLowerCase();

      if (
        lowerText.includes(
          "amazon"
        )
      ) {
        vendor =
          "Amazon";

        category =
          "Shopping";
      }

      if (
        lowerText.includes(
          "walmart"
        )
      ) {
        vendor =
          "Walmart";

        category =
          "Groceries";
      }

      if (
        lowerText.includes(
          "uber"
        )
      ) {
        vendor =
          "Uber";

        category =
          "Transport";
      }

      if (
        lowerText.includes(
          "zomato"
        ) ||
        lowerText.includes(
          "swiggy"
        )
      ) {
        vendor =
          "Food Delivery";

        category =
          "Food";
      }

      const amountMatch =
        text.match(
          /(\d+\.\d{2})/g
        );

      if (
        amountMatch &&
        amountMatch.length > 0
      ) {
        amount =
          amountMatch[
            amountMatch.length -
              1
          ];
      }

      setResult({
        vendor,
        amount,
        category,
        date:
          new Date().toLocaleDateString(),
      });

      toast.success(
        "Receipt scanned successfully"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "OCR scan failed"
      );
    } finally {
      setLoading(false);
    }
  }

  async function confirmTransaction() {
    try {
      setSaving(true);

      const token =
        localStorage.getItem(
          "token"
        );

      await api.post(
        "/transactions",
        {
          type: "expense",
          category:
            result.category,
          amount:
            Number(
              result.amount
            ),
          description: `Receipt scan from ${result.vendor}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Transaction added successfully"
      );

      setResult(null);

      setImage(null);

      setPreview("");
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to save transaction"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardLayout>

      <PageWrapper>

        <div className="space-y-8">

          <div>

            <h1 className="text-5xl font-bold mb-2">
              Receipt Scanner
            </h1>

            <p className="text-zinc-400 text-lg">
              AI-powered receipt scanning and expense extraction
            </p>

          </div>

          <div className="glass rounded-[32px] p-10 border border-white/10">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              <div>

                <div className="border-2 border-dashed border-cyan-500/20 rounded-[32px] p-10 text-center bg-white/[0.02]">

                  <div className="w-24 h-24 rounded-full bg-cyan-500/15 flex items-center justify-center mx-auto mb-6">

                    <Upload
                      size={42}
                      className="text-cyan-400"
                    />

                  </div>

                  <h2 className="text-3xl font-bold mb-3">
                    Upload Receipt
                  </h2>

                  <p className="text-zinc-400 mb-8 text-lg">
                    Upload a receipt image to extract expense details
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleUpload
                    }
                    className="hidden"
                    id="receipt-upload"
                  />

                  <label
                    htmlFor="receipt-upload"
                    className="finova-button inline-flex px-8 py-4 rounded-2xl font-semibold cursor-pointer"
                  >
                    Choose Receipt
                  </label>

                  {preview && (
                    <div className="mt-8">

                      <img
                        src={preview}
                        alt="Receipt Preview"
                        className="rounded-3xl border border-white/10 max-h-[400px] mx-auto"
                      />

                    </div>
                  )}

                </div>

              </div>

              <div>

                <div className="glass rounded-[32px] p-8 border border-white/10 h-full">

                  <div className="flex items-center gap-4 mb-8">

                    <div className="w-16 h-16 rounded-3xl bg-cyan-500/15 flex items-center justify-center">

                      <ScanLine
                        size={30}
                        className="text-cyan-400"
                      />

                    </div>

                    <div>

                      <h2 className="text-4xl font-bold">
                        AI Extraction
                      </h2>

                      <p className="text-zinc-400">
                        Smart receipt analysis
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={
                      scanReceipt
                    }
                    disabled={loading}
                    className="w-full finova-button py-5 rounded-2xl font-semibold text-lg mb-8"
                  >
                    {loading
                      ? "Scanning Receipt..."
                      : "Scan Receipt"}
                  </button>

                  {!result && (
                    <div className="text-center py-20 text-zinc-500">

                      <Receipt
                        size={60}
                        className="mx-auto mb-5 opacity-50"
                      />

                      <p className="text-lg">
                        Upload and scan a receipt to view extracted details
                      </p>

                    </div>
                  )}

                  {result && (
                    <div className="space-y-5">

                      <div className="glass rounded-2xl p-6 border border-white/10">

                        <p className="text-zinc-400 mb-2">
                          Vendor
                        </p>

                        <input
                          type="text"
                          value={
                            result.vendor
                          }
                          onChange={(e) =>
                            setResult({
                              ...result,
                              vendor:
                                e.target.value,
                            })
                          }
                          className="w-full bg-transparent text-2xl font-bold outline-none"
                        />

                      </div>

                      <div className="glass rounded-2xl p-6 border border-white/10">

                        <p className="text-zinc-400 mb-2">
                          Amount
                        </p>

                        <input
                          type="text"
                          value={
                            result.amount
                          }
                          onChange={(e) =>
                            setResult({
                              ...result,
                              amount:
                                e.target.value,
                            })
                          }
                          className="w-full bg-transparent text-2xl font-bold text-green-400 outline-none"
                        />

                      </div>

                      <div className="glass rounded-2xl p-6 border border-white/10">

                        <p className="text-zinc-400 mb-2">
                          Category
                        </p>

                        <input
                          type="text"
                          value={
                            result.category
                          }
                          onChange={(e) =>
                            setResult({
                              ...result,
                              category:
                                e.target.value,
                            })
                          }
                          className="w-full bg-transparent text-2xl font-bold text-cyan-400 outline-none"
                        />

                      </div>

                      <div className="glass rounded-2xl p-6 border border-white/10">

                        <p className="text-zinc-400 mb-2">
                          Date
                        </p>

                        <input
                          type="text"
                          value={
                            result.date
                          }
                          onChange={(e) =>
                            setResult({
                              ...result,
                              date:
                                e.target.value,
                            })
                          }
                          className="w-full bg-transparent text-2xl font-bold outline-none"
                        />

                      </div>

                      <button
                        onClick={
                          confirmTransaction
                        }
                        disabled={saving}
                        className="w-full finova-button py-5 rounded-2xl font-semibold text-lg"
                      >
                        {saving
                          ? "Saving Transaction..."
                          : "Confirm Transaction"}
                      </button>

                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}