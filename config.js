// config.js
// Kurlar, Semboller, Cüzdan Adresleri ve Genel Konfigürasyon

const CONFIG = {
  mockRates: {
    'BTC': { USD: 64000, EUR: 59000, GBP: 50000 },
    'ETH': { USD: 3500, EUR: 3200, GBP: 2700 },
    'BNB': { USD: 600, EUR: 550, GBP: 470 },
    'SOL': { USD: 150, EUR: 138, GBP: 118 },
    'POL': { USD: 0.70, EUR: 0.65, GBP: 0.55 },
    'AVAX': { USD: 35, EUR: 32, GBP: 27 },
    'LTC': { USD: 80, EUR: 74, GBP: 63 },
    'DOGE': { USD: 0.15, EUR: 0.14, GBP: 0.12 },
    'APT': { USD: 9, EUR: 8.3, GBP: 7.1 },
    'TRX': { USD: 0.35, EUR: 0.32, GBP: 0.27 },
    'ADA': { USD: 0.98, EUR: 0.90, GBP: 0.77 },
    'XRP': { USD: 2.50, EUR: 2.30, GBP: 1.95 },
    'DOT': { USD: 7.50, EUR: 6.90, GBP: 5.88 },
    'SUI': { USD: 3.80, EUR: 3.49, GBP: 2.97 },
    'NEAR': { USD: 6.20, EUR: 5.70, GBP: 4.85 },
    'ATOM': { USD: 11.50, EUR: 10.57, GBP: 9.00 },
    'FIL': { USD: 18.75, EUR: 17.23, GBP: 14.68 },
    'INJ': { USD: 28.30, EUR: 26.02, GBP: 22.15 }
  },
  fiatSymbols: { 'USD': '$', 'EUR': '€', 'GBP': '£' },
  
  wallets: {
    layer1_evm: {
      id: "layer1_evm",
      icon: "fa-brands fa-ethereum",
      label: { en: "ETHEREUM & EVM L1", de: "ETHEREUM & EVM L1" },
      items: [
        { name: "Ethereum", chain: "ERC20", ticker: "ETH", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Ethereum Classic", chain: "ETC Mainnet", ticker: "ETC", scheme: "ethereum:", addr: "0x27E291F5c3965f914dd99554182E43f87Fb5591b" },
        { name: "Binance Smart Chain", chain: "BEP20", ticker: "BNB", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Fantom", chain: "FTM Mainnet", ticker: "FTM", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Polygon", chain: "PoS", ticker: "POL", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Avalanche C-Chain", chain: "AVAX", ticker: "AVAX", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Cronos", chain: "CRO Mainnet", ticker: "CRO", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Celo", chain: "Celo Mainnet", ticker: "CELO", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Aurora", chain: "NEAR Rainbow", ticker: "ETH", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Moonbeam", chain: "Polkadot", ticker: "GLMR", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Moonriver", chain: "Kusama", ticker: "MOVR", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Gnosis", chain: "xDAI", ticker: "xDAI", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" }
      ]
    },
    layer2_solutions: {
      id: "layer2_solutions",
      icon: "fa-solid fa-layer-group",
      label: { en: "LAYER 2 SOLUTIONS", de: "LAYER 2 LÖSUNGEN" },
      items: [
        { name: "Arbitrum One", chain: "Arbitrum L2", ticker: "ETH", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Optimism", chain: "Optimism Mainnet", ticker: "ETH", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Base", chain: "Base Network", ticker: "ETH", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Mantle", chain: "Mantle L2", ticker: "MNT", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Metis", chain: "Metis L2", ticker: "METIS", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "zkSync Era", chain: "zkSync L2", ticker: "ETH", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Scroll", chain: "Scroll L2", ticker: "ETH", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Linea", chain: "Linea L2", ticker: "ETH", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Blast", chain: "Blast L2", ticker: "ETH", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Taiko", chain: "Taiko L2", ticker: "ETH", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Polygon zkEVM", chain: "zkEVM", ticker: "ETH", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Boba", chain: "Boba Network", ticker: "ETH", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Manta Pacific", chain: "Manta L2", ticker: "ETH", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "World Chain", chain: "World L2", ticker: "ETH", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" }
      ]
    },
    bitcoin_family: {
      id: "bitcoin_family",
      icon: "fa-brands fa-bitcoin",
      label: { en: "BITCOIN & UTXO", de: "BITCOIN & UTXO" },
      items: [
        { name: "Bitcoin", chain: "Native SegWit", ticker: "BTC", scheme: "bitcoin:", addr: "bc1q5m6k67puluyl4qaz9mmz3aq47hk067w2x2xm5x" },
        { name: "Bitcoin", chain: "Bitcoin Network", ticker: "BTC", scheme: "bitcoin:", addr: "bc1qrhntxw9qxxpzfek8cmdjx5m6kfaa0a72gww5r3" },
        { name: "Litecoin", chain: "LTC Mainnet", ticker: "LTC", scheme: "litecoin:", addr: "ltc1qzdr3zvu5ls04xeg69qxlhvdz8n2vnj2fmt6536" },
        { name: "Dogecoin", chain: "DOGE Mainnet", ticker: "DOGE", scheme: "dogecoin:", addr: "DGDivEtCC67Hk5DG5BSXUYLJPjoE3U1iB3" },
        { name: "Bitcoin Cash", chain: "BCH Mainnet", ticker: "BCH", scheme: "bitcoincash:", addr: "qqwa4mmzf4ylf84uysvuutsgep4aexssks69694eyl" },
        { name: "Dash", chain: "DASH Mainnet", ticker: "DASH", scheme: "dash:", addr: "XkdYayZkCQE23v5HqP1ZtBZSy5emzUWFhx" },
        { name: "DigiByte", chain: "DGB Mainnet", ticker: "DGB", scheme: "digibyte:", addr: "dgb1qcupzc7kym0agpd6lepa3w7gns3c6rvaq4w6rgl" },
        { name: "Kaspa", chain: "KAS Mainnet", ticker: "KAS", scheme: "kaspa:", addr: "kaspa:qzjz2j90rett69h2xm9gpy94l8x3mmlce52t0lvlzs5vkq4y4elxuyem5qmru" },
        { name: "Zcash", chain: "ZEC Mainnet", ticker: "ZEC", scheme: "zcash:", addr: "t1Y7FwKpNENCce4zqKeSuyQeH7XX2rfP5hD" }
      ]
    },
    solana_ecosystem: {
      id: "solana_ecosystem",
      icon: "fa-solid fa-rocket",
      label: { en: "SOLANA ECOSYSTEM", de: "SOLANA ÖKOSYSTEM" },
      items: [
        { name: "Solana", chain: "Solana Mainnet", ticker: "SOL", scheme: "solana:", addr: "Gi6LiGTrnhZ9R58TLGDbJku8qbHSiWBNiQ9o7BbPDN7j" },
        { name: "Solana", chain: "Solana Network", ticker: "SOL", scheme: "solana:", addr: "5KMY6k9nUFzGwZGK1geQm6aoi52eNBAXL2eg92sV9vvs" }
      ]
    },
    polkadot_cosmos: {
      id: "polkadot_cosmos",
      icon: "fa-solid fa-sitemap",
      label: { en: "POLKADOT & COSMOS", de: "POLKADOT & COSMOS" },
      items: [
        { name: "Polkadot", chain: "DOT", ticker: "DOT", scheme: "polkadot:", addr: "12dkoSuQFb1JkHspaaPXBBuYH5zj6xkthfoGiQZdwcnyeHiq" },
        { name: "Kusama", chain: "KSM", ticker: "KSM", scheme: "kusama:", addr: "GiM67BQ5mmyCyhv5i1aKHm6tJE5TAtAd53snF58YoKdUB4X" },
        { name: "Cosmos", chain: "ATOM", ticker: "ATOM", scheme: "cosmos:", addr: "cosmos1jhjxsh35eueeud5qnvwuf5atf26t4u8tk9mzlj" },
        { name: "Osmosis", chain: "OSMO", ticker: "OSMO", scheme: "osmosis:", addr: "osmo1jhjxsh35eueeud5qnvwuf5atf26t4u8t77gjfq" },
        { name: "Terra", chain: "LUNA", ticker: "LUNA", scheme: "terra:", addr: "terra1kv5lwz7p84dachtea2ldxhvrp4gen0x7myhqpg" },
        { name: "Terra Classic", chain: "LUNC", ticker: "LUNC", scheme: "terra:", addr: "terra1kv5lwz7p84dachtea2ldxhvrp4gen0x7myhqpg" }
      ]
    },
    alt_l1_chains: {
      id: "alt_l1_chains",
      icon: "fa-solid fa-layer-group",
      label: { en: "ALT LAYER 1", de: "ALT LAYER 1" },
      items: [
        { name: "Aptos", chain: "APT Mainnet", ticker: "APT", scheme: "aptos:", addr: "0x610592bab5d23a78720e516883c88dbeda667662574cfa98c4f70c7567341f6e" },
        { name: "Sui", chain: "SUI Mainnet", ticker: "SUI", scheme: "sui:", addr: "0xe92b6e508bf2d2a527ef251350c3b9b918b572442b5e8c55cad04ef92a7cca1b" },
        { name: "NEAR Protocol", chain: "NEAR", ticker: "NEAR", scheme: "near:", addr: "92f507bd358c3ad866edb1ec89bf27371f9062e54686553468079661d7b22990" },
        { name: "Tron", chain: "TRC20", ticker: "TRX", scheme: "tron:", addr: "TGwWv8p5deEtk7uRXBKqtQ8LJsTCnF3yJ4" },
        { name: "Ripple", chain: "XRP Ledger", ticker: "XRP", scheme: "xrpl:", addr: "rJ5Z7rQkU3hAjWgpz4bhMT3ye4H3q4vcaz" },
        { name: "Cardano", chain: "ADA Mainnet", ticker: "ADA", scheme: "cardano:", addr: "addr1qycevytj7d4rwrnkvkfa997m445pg46palfat3s0ttym9j34gnasmzzlmgv2kmvsysmtt22huyd3fufp5vrh8gty45yqx7a493" },
        { name: "Filecoin", chain: "FIL", ticker: "FIL", scheme: "filecoin:", addr: "f1vvqixp3kmbdd7jefbn73aohttj6lzmnbomya63y" },
        { name: "MultiversX", chain: "EGLD", ticker: "EGLD", scheme: "elrond:", addr: "erd1t8rj25tf5wv5gvd9eup7drjd4s4y649ztjd7760v094f8mpjep9qq9zyg8" },
        { name: "VeChain", chain: "VET", ticker: "VET", scheme: "vechain:", addr: "0x82F7154A810F0a7e0A24007c58eafc9BA8c9747d" },
        { name: "Theta", chain: "THETA", ticker: "THETA", scheme: "theta:", addr: "0x83e5987Ba4cE819563D5936f7C42Af2F81EcF659" }
      ]
    },
    emerging_chains: {
      id: "emerging_chains",
      icon: "fa-solid fa-star",
      label: { en: "EMERGING CHAINS", de: "AUFSTREBENDE KETTEN" },
      items: [
        { name: "Injective", chain: "INJ", ticker: "INJ", scheme: "injective:", addr: "inj18672ga7v45j7x9vwmtlqlqu7tf05uw7yapxqef" },
        { name: "Alephium", chain: "ALPH", ticker: "ALPH", scheme: "alephium:", addr: "123C2w6jE9z1wJ7Pqi7HxbrAgfc2LnQQCtJ1HbDF32RSk" },
        { name: "Nervos", chain: "CKB", ticker: "CKB", scheme: "nervos:", addr: "ckb1qyqtlmeetg2vukjvrn69mnz2vw5zc4qpxdnss6m5zz" },
        { name: "AirDAO", chain: "AMB", ticker: "AMB", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Core", chain: "CORE", ticker: "CORE", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Kaia", chain: "KAIA", ticker: "KAIA", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Viction", chain: "VIC", ticker: "VIC", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Telos", chain: "TLOS", ticker: "TLOS", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Kava", chain: "KAVA", ticker: "KAVA", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "KCC", chain: "KCS", ticker: "KCS", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" }
      ]
    },
    special_networks: {
      id: "special_networks",
      icon: "fa-solid fa-crown",
      label: { en: "SPECIAL NETWORKS", de: "SPEZIELLE NETZWERKE" },
      items: [
        { name: "Monero", chain: "XMR", ticker: "XMR", scheme: "monero:", addr: "48D24kc4jPE34rwTjKTU3vfnpKurki6qfSt8qUq6jyTx6AEaWvcJfVWLGS2RqK6YSbLnUVge4ntvEcYuidYRz5Xp6qTqjXH" },
        { name: "Venom", chain: "VENOM", ticker: "VENOM", scheme: "toncoin:", addr: "0:23082e40c9ba05b12a9e7ab02ab8e66f0b5928a5d6b09d8c360b681e08d3b56a" },
        { name: "TON", chain: "GRAM", ticker: "GRAM", scheme: "ton:", addr: "UQCNRRxTdUmHHXQ9EgIJ8f1fkym5_yer9HwYelhBWIhaIxqg" },
        { name: "Harmony", chain: "ONE", ticker: "ONE", scheme: "harmony:", addr: "one1pefanjkk4cyl274ramc6n4urgtlzeynmuqyg9q" },
        { name: "Hedera", chain: "HBAR", ticker: "HBAR", scheme: "hedera:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Rootstock", chain: "RBTC", ticker: "RBTC", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Oasis Sapphire", chain: "ROSE", ticker: "ROSE", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Sei", chain: "SEI", ticker: "SEI", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Acala", chain: "AUSD", ticker: "ACA", scheme: "acala:", addr: "257BycEDwsbg3FPNMKqzqhFJ4gunu4mUKgmcygjop7sSurAh" },
        { name: "XDC Network", chain: "XRC20", ticker: "XDC", scheme: "xdc:", addr: "xdc3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" }
      ]
    },
    testnets: {
      id: "testnets",
      icon: "fa-solid fa-triangle-exclamation",
      isTestnet: true,
      label: { en: "DEVELOPER TESTNETS", de: "ENTWICKLER TESTNETS" },
      items: [
        { name: "Bitcoin Testnet", chain: "Testnet 4", ticker: "tBTC", scheme: "bitcoin:", addr: "tb1pyfn4j43h83vjtgrpqy2tscuqg54jyu9rgvvl3ztfdz9mceexsrwq1za4w0" },
        { name: "Sepolia", chain: "Ethereum Testnet", ticker: "sETH", scheme: "ethereum:", addr: "0x742d35Cc6634C0532925a3b844Bc9e7595f42bE" },
        { name: "Monad Testnet", chain: "MON-Test", ticker: "MON", scheme: "ethereum:", addr: "0x3eBCa477Ccad25e3158Edafe0F839e5a5f4E3Bc4" },
        { name: "Sui Testnet", chain: "SUI-Test", ticker: "tSUI", scheme: "sui:", addr: "0xe92b6e508bf2d2a527ef251350c3b9b918b572442b5e8c55cad04ef92a7cca1b" }
      ]
    }
  },
  i18n: I18N_DATA // i18n.js dosyasındaki verileri otomatik olarak alır.
};
