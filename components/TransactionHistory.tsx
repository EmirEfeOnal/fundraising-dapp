"use client"

import { useState } from "react"
import { Clock, ExternalLink, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { useWallet } from "./WalletProvider"
import { useAccountTransactions } from "../hooks/useHiroApi"
import { formatSTXAmount, formatTransactionStatus } from "../lib/hiro-api"
import { getNetworkInfo } from "../lib/donation-utils"

export default function TransactionHistory() {
  const { isConnected, userAddress } = useWallet()
  const { transactions, loading, error } = useAccountTransactions(userAddress, 10)
  const [showAll, setShowAll] = useState(false)

  if (!isConnected) return null

  const displayTransactions = showAll ? transactions : transactions.slice(0, 5)
  const networkInfo = getNetworkInfo()

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Transaction History</h3>
            <p className="text-sm text-gray-600">Recent activity</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-sm text-red-600">❌ {error}</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No transactions found</p>
          <p className="text-sm text-gray-400 mt-1">Your transaction history will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayTransactions.map((tx: any) => (
            <div key={tx.tx_id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                {tx.tx_type === "token_transfer" ? (
                  tx.sender_address === userAddress ? (
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  ) : (
                    <ArrowDownLeft className="w-4 h-4 text-white" />
                  )
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-900 truncate">
                    {tx.tx_type === "token_transfer"
                      ? tx.sender_address === userAddress
                        ? "Sent STX"
                        : "Received STX"
                      : tx.tx_type.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </p>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                    {formatTransactionStatus(tx.tx_status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {new Date(tx.burn_block_time_iso).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                {tx.tx_type === "token_transfer" && (
                  <p className="font-medium text-gray-900">
                    {tx.sender_address === userAddress ? "-" : "+"}
                    {formatSTXAmount(Number.parseInt(tx.token_transfer?.amount || "0"))} STX
                  </p>
                )}
                <a
                  href={`${networkInfo.explorerUrl}/txid/${tx.tx_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                >
                  View <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}

          {transactions.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {showAll ? "Show Less" : `Show All (${transactions.length})`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
