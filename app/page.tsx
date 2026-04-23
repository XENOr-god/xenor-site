'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ticker from '@/components/ui/Ticker';
import About from '@/components/About';
import Features from '@/components/Features';
import HowToBuy from '@/components/HowToBuy';
import Contract from '@/components/Contract';
import Tokenomics from '@/components/Tokenomics';
import Roadmap from '@/components/Roadmap';
import Security from '@/components/Security';
import Footer from '@/components/Footer';
import EntryGate from '@/components/EntryGate';

export default function Home() {
  const [isEntryComplete, setIsEntryComplete] = useState(false);
  const [userName, setUserName] = useState('');

  const handleEntryComplete = (name: string) => {
    setUserName(name);
    setIsEntryComplete(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isEntryComplete ? (
          <EntryGate onComplete={handleEntryComplete} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar />
            <main className="relative">
              <Hero userName={userName} />
              <Ticker items={["BUILT IN RUST", "SOLANA NATIVE", "XENOR_CORE_ACTIVE", "DETERMINISTIC_EXECUTION"]} />
              <About />
              <Ticker items={["PROTOCOL_LAYER_01", "CORE_ENGINE_STABLE", "VERIFIED_COMPUTATION", "XENOR_SIM_ACTIVE"]} reverse />
              <Features />
              <Ticker items={["PHASE_ALPHA_COMPLETE", "SYSTEM_INTEGRATION", "ECOSYSTEM_EXPANSION", "NETWORK_SYNCED"]} />
              <HowToBuy />
              <Ticker items={["RAYDIUM_POOL_ACTIVE", "JUPITER_AGGREGATOR", "SOLANA_MAINNET", "TRADING_LIVE"]} reverse />
              <Tokenomics />
              <Ticker items={["1B_TOTAL_SUPPLY", "0%_TAX", "LP_LOCKED", "RENOUNCED_OWNERSHIP"]} />
              <Contract />
              <Ticker items={["VERIFIED_DEPLOYER", "OPEN_SOURCE", "TRUSTLESS_INFRA", "SECURE_PROTOCOL"]} reverse />
              <Roadmap />
              <Ticker items={["MILESTONE_REACHED", "STRATEGIC_PARTNERS", "GOVERNANCE_LAUNCH", "FUTURE_READY"]} />
              <Security />
              <Ticker items={["XENOR_NETWORK_STABLE", "ENCRYPTION_LAYER_01", "DETERMINISTIC_HASH_VERIFIED"]} reverse />
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
