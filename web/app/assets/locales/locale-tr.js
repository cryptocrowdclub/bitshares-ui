 module.exports = {
    languages: {
        en: "English",
        cn: "简体中文",
        fr: "Français",
        ko: "한국어",
        de: "Deutsch",
        es: "Español",
        tr: "Turkish"
    },
    header: {
        title: "Graphene Ara Birimi",
        account: "Hesap",
        dashboard: "Pano",
        explorer: "Gezgin",
        exchange: "Borsa",
        payments: "Transfer", 
        logout: "Çıkış",
        settings: "Ayarlar",
        current: "Kullanımdaki Hesap",
        create_account: "Hesap Açın",
        create_asset: "Emtia Oluştur",
        lock: "Kiliti Kapat",
        unlock: "Kiliti Aç",
        help: "Yardım",
        locked_tip: "Cüzdan kilidi kapalı . Açmak için tıkla.",
        unlocked_tip: "Cüzdan kilidi açık. Kapamak için tıkla."
    },
    operation : {
        pending: "sırada %(blocks)s blok var"
    },
    account: {
        asset: "Emtia",
        market_value: "Piyasa Değeri",
        hour_24: "24st Değişim",
        recent: "Son hareketler",
        name: "Hesap adı",
        more: "daha fazla gör",
        member: {
            stats: "Üyelik",
            join: "Katılma tarihi",
            registrar: "Kayıt yapan",
            referrer: "Affiliate Referrer",
            lifetime_referrer: "Lifetime Referrer",
            network_percentage: "Ağ",
            fee_allocation: "Bedel Dağılımı",
            membership: "Üyelik",
            fees_paid: "Ödenen ömürlük bedeller",
            fees_pending: "Bekleyen bedeller",
            fees_vested: "Bekleyen hak edilmiş bedeller",
            referrals: "Referraller",
            rewards: "Nakit-İade Ödülleri",
            cashback: "Nakit-İade",
            vested: "Vested",
            unknown: "Bilinmeyen üye",
            lifetime: "Ömürboyu üye",
            basic: "Temel üye",
            annual: "Yıllık abone",
            upgrade_lifetime: "Ömürboyu-abone ol",
            subscribe: "Yıllık abone ol",
            expires: "bitiş tarihi",
            membership_expiration: "Üyelik bitiş tarihi"
        },
        user_issued_assets: {
            symbol: "Simge",
            name: "Emtia Adı",
            description: "Açıklama",
            max_supply: "Maximum arz",
            precision: "Hassasiyet",
            to: "Hesaba çıkar",
            details: "Ayrıntılar"
        },
        connections: {
            known: "Tarafından Tanınıyor",
            "black": "Tarafından Karalistelenmiş"
        },
        perm: {
            active: "Aktif Yetkiler",
            owner: "Sahip Yetkileri ",
            publish: "Değişiklikleri Yaınla",
            reset: "Değişiklikleri Sıfırla",
            add: "Yetki Ekle",
            type: "Tür",
            key: "Anahtar/İsim",
            weight: "Ağırlık",
            threshold: "Alt Sınır",
            confirm_add: "Ekle",
            cancel: "İptal",
            add_permission_label: "Hesap adı/anahtarı ve ağırlık değerini girin",
            account_name_or_key: "Hesap adı yada anahtar",
            memo_public_key: "Açık Anahtar Açıklama"
        },
        votes: {
            proxy: "Vekil Oylama Hesabı",
            no_proxy: "Vekil Yok",
            name: "Ad",
            info: "Bilgi",
            votes: "Oylar",
            url: "Web Sayfası",
            support: "Destek",
            workers: "Bütçe Öğeler",
            publish: "Değişiklikleri Yaınla",
            add_witness: "Add",
            remove_witness: "Kaldır",
            remove_committee: "Kaldır",
            add_committee: "Ekle",
            add_committee_label: "Kurul Üyesi",
            add_witness_label: "Tanık",
            approve_worker: "İşgören teklifini onayla",
            reject_worker: "İşgören teklifini reddet"
        },
        options: {
            num_witnesses: "Gerekli Tanıklar",
            num_committee: "Gerekli Kurul Üyeleri",
            memo_key: "Not Anahtar"
        },
        upgrade: "Hesap yükselt",
        unfollow: "Takibi bırak",
        follow: "Takib et",
        pay: "Öde",
        overview: "Genel Bakış",
        history: "Geçmiş",
        payees: "Alıcılar",
        permissions: "Yetkiler",
        voting: "Oylama",
        orders: "Talimatlar",
        select_placeholder: "Hesap Seç...",
        errors: {
            not_found: "%(name)s adında bir hesap yok, doğru yazdığınıza emin misiniz?",
            invalid: "Geçersiz hesap adı",
            unknown: "Bilinmeyan hesap",
            not_yours: "Hesap sizin değil"
        }
    },
    pagination: {
        newer: "Daha yeni",
        older: "Daha eski"
    },
    transfer: {
        from: "Gönderici",
        pay_from: "Buradan öde",
        amount: "Miktar",
        to: "Alıcı",
        memo: "Açıklama",
        fee: "Bedel",
        send: "Gönder",
        final: "Son bakiye",
        balances: "Bakiyeler",
        available: "Mevcut",
        errors: {
            req: "Mecburi alan",
            pos: "Miktar pozitif olmak zorunda",
            valid: "Lütfen geçerli bir pozitif numara giriniz",
            balance: "Son bakiye 0 dan büyük olmalıdır"
        },
        back: "GERİ",
        confirm: "ONAYLA",
        broadcasting: "Yayınlanıyor...",
        broadcast: "Transfer işleminiz ağa yayınlanmıştır",
        again: "BAŞKA BİR TRANSFER GERÇEKLEŞTİR",
        see: "TRANSFER İŞLEMLERİMİ GÖR",
        close: "Kapat"
    },
    transaction: {
        confirm: "Lütfen işlemi onayla",
        broadcast_success: "İşlem yayınlanmıştır",
        transaction_confirmed: "İşlem onaylandı",
        broadcast_fail: "İşlemin yayınlanması başarısız: %(message)s",
        broadcasting: "İşlem yayınlanıyor..",
        broadcasting_short: "Yayınlanıyor..",
        sent: "gönderildi",
        to: "alıcı",
        received: "alındı",
        from: "gönderen",
        amount_sell: "Satılacak miktar",
        expiration: "Bitiş tarihi ",
        fill_or: "Doldur yada öldür",
        min_receive: "Alınacak minimum miktar",
        seller: "Satıcı",
        collateral: "Teminat",
        coll_ratio: "Başlanıç teminat oranı",
        coll_maint: "Teminat muhafaza oranı",
        "create_key": "Açık anahtar oluşturuldu",
        reg_account: "Hesap kayıt olundu",
        was_reg_account: "kayıt yaptıran",
        create_asset: "emtia oluşturuldu",
        limit_order_sell: "verilen talimat no: #%(num)s  satılacak miktar:  %(sell_amount)s fiyat: ",
        limit_order_buy: "verilen emir no: #%(num)s alınacak miktar: %(buy_amount)s fiyat: ",
        limit_order_cancel: "talimat iptal edildi",
        short_order: "Satış için Short emri verildi",
        short_order_cancel: "Short iptal edildi",
        at: "konumunda",
        coll_of: "teminatıyla",
        call_order_update: "için marjin pozisyonu güncellendi ",
        lifetime_upgrade_account: "ömürlük üyeye yükseltildi",
        annual_upgrade_account: "yıllık üyeliğe yükseltildi",
        update_account: "güncellenmiş hesap",
        whitelist_account: "Hesap güvenilirler listesine alındı",
        whitelisted_by: "Hesap tarafından güvenilirler listesine alındı",
        transfer_account: "Hesap transfer edildi",
        update_asset: "Emtia güncellendi",
        update_feed_producers: "Emtia bilgi besleyiciler güncellendi ",
        feed_producer: "Emtiaya bilgi besleyicisi oldu",
        feed_price: "Bilgi besleme fiyatı",
        asset_issue: "Piyasaya Çıkarılmış",
        was_issued: "Piyasaya çıkarılmış",
        by: "tarafından",
        burn_asset: "Yakıldı",
        fund_pool: "Emtia bedel havuzu finans kaynağı",
        asset_settle: "Hesap görülmesi talep edilen",
        asset_global_settle: "Evensel hesap görülmesi talep edilen",
        publish_feed: "yayınlanmış bilgi besleme ",
        committee_member_create: "Kurul üyesi oluşturuldu",
        witness_create: "Tanık oluşturuldu",
        witness_update: "Tanık güncellendi",
        witness_pay: "Hesaba tanık ödemesi çekildi",
        witness_receive: "Tanık tarafından tanık geldi",
        proposal_create: "Teklif oluşturuldu",
        proposal_update: "Bir teklif güncellendi",
        proposal_delete: "Teklif güncellendi",
        withdraw_permission_create: "Hesaptan çekme yetkisi verildi",
        withdraw_permission_update: "Hesaptan çekme yetkisi güncellendi",
        withdraw_permission_claim: "Hesaptan çekme yetkisi talep edildi",
        withdraw_permission_delete: "Hesaptan çekme yetkisi silindi",
        paid: "ödendi",
        obtain: "edinmek için",
        global_parameters_update: "Evrensel parametreler güncellendi",
        file_write: "Bir dosya yazıldı",
        vesting_balance_create: "created vesting balance of",
        for: "için",
        vesting_balance_withdraw: "Hakedilmiş bakiyeyi çek",
        bond_create_offer: "Senet teklifi oluştur",
        bond_cancel_offer: "Senet teklifi iptal edildi",
        bond_accept_offer: "Senet teklifi kabul edilen:",
        bond_claim_collateral: "Teminatı istenen :",
        bond_pay_collateral: "Teminatı ödenen:",
        create_worker: "Ödemesiyle bütçe öğesi yaratılan: ",
        custom: "Özel işlem yaratıldı",
        order_id: "Talimat no",
        balance_claim: "İstenen bakiye :  %(balance_amount)s bakiye no #%(balance_id)s",
        balance_owner: "Bakiye sahibinin anahtarı",
        balance_id: "Bakiye No",
        deposit_to: "Hesaba yatırıldı",
        claimed: "Toplam talep edilen",
        borrow_amount: "Borç alınacak miktar",
        funding_account: "Kaynak Hesap",
        delta_collateral: "Teminat değişimi",
        delta_debt: "Verecek değişimi",
        new_url: "Websitesi",
        publisher: "Yayıncı",
        trxTypes: {
            transfer: "Transfer",
            limit_order_create: "Talimat ver",
            limit_order_cancel: "Talimatı iptal et",
            call_order_update: "Margini güncelle",
            account_create: "Hesap yarat",
            account_update: "Hesap güncelle",
            account_whitelist: "Hesap ak listesi",
            account_upgrade: "Hesap yükselt",
            account_transfer: "Hesap transfer et",
            asset_create: "Emtia oluştur",
            asset_update: "Emtia güncelle",
            asset_update_bitasset: "Akıllı para güncelle",
            asset_update_feed_producers: "Emtia beslemeci güncelle",
            asset_issue: "Emtia çıkar",
            asset_reserve: "Emtia yak",
            asset_fund_fee_pool: "Emtia bedeli havuzu finanse et",
            asset_settle: "Emtia hesap görme",
            asset_global_settle: "Evrensel Emtia hesap görme",
            asset_publish_feed: "Bilgi besleme kaynağını yayınla",
            committee_member_create: "Kurul üyesi oluştur",
            witness_create: "Tanık oluştur",
            witness_update: "Tanık güncelle",
            witness_withdraw_pay: "Tanık maaş çekimi",
            proposal_create: "Teklif oluştur",
            proposal_update: "Teklif güncelle",
            proposal_delete: "Teklif sil",
            withdraw_permission_create: "Hesaptan çekme yetkisi oluştur",
            withdraw_permission_update: "Hesaptan çekme yetkisi güncelle",
            withdraw_permission_claim: "Para çekme yetkisi talep et",
            withdraw_permission_delete: "Hesaptan çekme yetkisi sil",
            fill_order: "Talimat ver",
            committee_member_update_global_parameters: "Evrensel parametreleri güncelle",
            vesting_balance_create: "Hakedilmiş bakiye oluştur",
            vesting_balance_withdraw: "Hakedilmiş bakiyeyi çek",
            worker_create: "Bütçe öğesi oluştur",
            custom: "Kişiye özel",
            assert: "İşlem talep et",
            balance_claim: "Bakiyeyi Talep et",
            override_transfer: "Transfer işlemini çiğne"
        }
    },
    explorer: {
        accounts: {
            title: "Hesaplar"
        },
        blocks: {
            title: "Blokzinciri",
            globals: "Evrensel parametreler",
            recent: "En son bloklar"
        },
        block: {
            title: "Blok",
            id: "Blok Kimlik",
            witness: "Tanık",
            count: "İşlem Sayısı",
            date: "Tarih",
            time: "Zaman",
            previous: "Bir önceki",
            previous_secret: "Bir önceki gizli",
            next_secret: "Bir sonraki gizli hash",
            op: "İşlem",
            trx: "Hareket",
            op_type: "İşlem türü",
            fee_payer: "Bedel ödeyici hesap",
            key: "Açık anahtar",
            transactions: "Hareket Sayısı",
            account_upgrade: "Hesap yükseltme",
            lifetime: "Ömürboyu üyeliğe yükselt",
            authorizing_account: "Yetki veren hesap ",
            listed_account: "Kaydedilmiş hesap",
            new_listing: "Yeni kayıt",
            asset_update: "güncellenecek emtia",
            common_options: "Yaygın seçenekler",
            new_options: "Yeni seçenekler",
            new_producers: "Yeni bilgi besleyicileri",
            asset_issue: "Çıkarılacak miktar",
            max_margin_period_sec: "Max marjin periodları (s)",
            call_limit: "İtfa limiti",
            short_limit: "Short limit",
            settlement_price: "Hesap görme fiyatı"
        },
        assets: {
            title: "Emtialar",
            market: "KıllıParalar",
            user: "Kullanıcı tarafından Çıkarılan Emtialar",
            symbol: "Simge",
            id: "ID",
            issuer: "Çıkarıcı",
            precision: "Hassasiyet"
        },
        asset: {
            not_found: "%(name)s emtiası mevcut değil",
            summary: {
                asset_type: "Emtia türü",
                issuer: "Çıkarıcı",
                current_supply: "Şimdiki Arz",
                stealth_supply: "Gizli arz",
                market_fee: "Piyasa bedeli",
                max_market_fee: "Max Piyasa bedeli"
            },
            price_feed: {
                price_feed: "Fiyat Bilgi Beslemesi",
                settlement_price: "Hesap görme fiyatı",
                maintenance_collateral_ratio: "Muhafaza teminat oranı",
                maximum_short_squeeze_ratio: "Maximum short sıkıştırma oranı"
            },
            fee_pool: {
                fee_pool: "Bedel Havuzu",
                core_exchange_rate: "Esas kur",
                pool_balance: "Havuz bakiyesi",
                unclaimed_issuer_income: "Sahipsiz çıkarıcı geliri"
            },
            permissions: {
                permissions: "Yetkiler",
                max_market_fee: "Max piyasa bedeli",
                max_supply: "Max arz",
                chargeMarketFee: "Piyasa bedeli ödet",
                allowWhiteList: "Ak listeye müsade et",
                allowIssuerOverride: "Çıkarıcıya çiğneme izni ver",
                restrictTransfers: "Transfer işlemlerini kısıtla",
                allowForceSettle: "Mecburi hesap görülmesine müsade et",
                allowGlobalSettle: "Genel hesap görülmesine müsade et",
                allowStealthTransfer: "Gizli transfer işlemlerine müsade et",
                blacklist_authorities: "Karaliste mercileri",
                blacklist_markets: "Karaliste piyasları",
                whitelist_authorities: "Akliste mercileri",
                whitelist_markets: "Akliste piyasaları"
            }
        },
        witnesses: {
            title: "Tanıklar"
        },
        committee_members: {
            title: "Kurul Üyeleri",
            active: "Toplam aktif kurul üye sayısı"
        },
        committee_member: {
            title: "Kurul üyesi"
        },
        workers: {
            title: "Bütçe Öğeleri"
        },
        proposals: {
            title: "Teklifler"
        },
        account: {
            title: "Hesap"
        }
    },
    settings: {
        inverseMarket: "Piyasa eğilim tercihi",
        unit: "Tercih edilen hesap birimi",
        confirmMarketOrder: "Piyasa emirleri için onay talep et",
        locale: "Lisanı değiştir",
        confirm_yes: "Herzaman",
        confirm_no: "Hiçbirzaman",
        always_confirm: "Onay için herzaman sor",
        wallets: "Cüzdanlar"
    },
    footer: {
        title: "OpenLedger",
        block: "Baş blok",
        loading: "Yüklüyor..."
    },
    exchange: {
        price_history: "Fiyat Geçmişi",
        order_depth: "Emir Derinliği",
        market_history: "Piyasa Geçmişi",
        balance: "Bakiyeniz",
        lowest_ask: "İstenilen en düşük fiyat",
        highest_bid: "Verilen en yüksek fiyat",
        total: "Toplam",
        value: "Değer",
        price: "Fiyat",
        latest: "En yeni fiyat",
        call: "İtfa Fiyatı",
        volume: "Hacim",
        spread: "Fark",
        quantity: "Miktar",
        buy: "Satın al",
        sell: "Sat",
        confirm_buy: "Alma emrini onayla: Miktar :%(buy_amount)s miktarda %(buy_symbol)s   Fiyat: %(price_amount)s %(price_symbol)s",
        confirm_sell: "Satış emtini onayla: Miktarı: %(sell_amount)s %(sell_symbol)s Fiyatı:%(price_amount)s %(price_symbol)s"
    },
    markets: {
        choose_base: "Temel emtiayı sç",
        filter: "Filtrele",
        core_rate: "Esas oran",
        supply: "Arz",
        search: "Ara"
    },
    wallet: {
        title: "Cüzdan",
        confirm: "Parola (onayla)",
        password: "Parola",
        existing_password: "Mevcut parola",
        change_password: "Parolayı Değiştir",
        change_wallet: "Cüzdanı Değiştir",
        wallet_created: "Cüzdan Oluşturuldu",
        create_wallet: "Cüzdan Oluştur",
        delete_wallet: "Çüzdanı Sil",
        delete_confirm_line1: "KESİNLİKLE emin misiniz?",
        delete_confirm_line2: "Bunu okumazsanız beklenmedik şeyler olabilir!",
        delete_confirm_line3: "Bu işlem geri düzeltilemez.",
        delete_wallet_name: "(%(name)s)Adlı Cüzdanı Sil",
        balance_claims: "Bakiye Talepleri",
        download: "İndir",
        name: "Cüzdan Adı",
        create: "Oluştur",
        console: "Cüzdan Yönetim Paneli",
        create_backup: "Yedek Oluştur",
        backup_brainkey: "Beyinanahtarı Yedekle",
        create_backup_of: "(%(name)sAdlı Cüzdanı Yedekle)",
        import_backup: "Yedeği İçeri Aktar",
        restore_backup: "Yedekten Geri Yükle",
        import_keys: "İçeri Anahtar Aktar",
        brainkey: "Beyinanahtarı",
        new_wallet: "Yeni Cüzdan",
        active_wallet: "Aktif Cüzdan",
        verified: "Doğrulanmış",
        verify_prior_backup: "Yedeklemeden Önce Doğrula",
        cancel: "İptal",
        reset: "Sıfırla",
        done: "Tamam",
        verify: "Doğrula",
        invalid_format: "Geçersiz Biçem",
        enter_password: "Parola Girin",
        downoad: "İndir",
        new_wallet_name: "Yeni Cüzdan Adı",
        wallet_exist: "Zaten mevcut , yeni bir ad seçin",
        wallet_exist_with_name: "(%(name)s) adında bir cüzdan zaten mevcut, lütfen adını değiştirin",
        accept: "Kabul",
        ready_to_restore: "Eski Haline Dönmeye Hazır",
        restore_wallet_of: "(%(name)s Adlı Cüzdanı Eski Haline Getir)",
        restore_success: "(%(name)s)Adlı cüzdan başarıyla eski haline döndürüldü",
        change: "Değiştir (%(name) ait Cüzdan )"
    },
    borrow: {
        title: "%(asset_symbol)s için teminat pozisyonu",
        no_valid: "%(asset_symbol)s için geçerli bilgi beslemeler mevcut değil",
        coll_ratio: "Teminat oranı",
        adjust: "Pozisyonu düzenle",
        errors: {
            below: "Teminat oranı muhafaza seviyesinden düşük",
            collateral: "Yetersiz teminat seviyesi"
        }
    },
    modal : {
      issue : {
        to: "Adına Çıkacak kişi",
        amount: "Çıkacak miktar",
        submit: "Emtia çıkar"
      }
    }
};
