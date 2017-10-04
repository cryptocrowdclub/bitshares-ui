import React from "react";
import Immutable from "immutable";
import Translate from "react-translate-component";
import BalanceComponent from "../Utility/BalanceComponent";
import TotalBalanceValue from "../Utility/TotalBalanceValue";
import SettleModal from "../Modal/SettleModal";
import {BalanceValueComponent, EquivalentValueComponent} from "../Utility/EquivalentValueComponent";
import AssetName from "../Utility/AssetName";
import CollateralPosition from "../Blockchain/CollateralPosition";
import { RecentTransactions } from "./RecentTransactions";
import Proposals from "components/Account/Proposals";
import {ChainStore} from "bitsharesjs/es";
import SettingsActions from "actions/SettingsActions";
import assetUtils from "common/asset_utils";
import counterpart from "counterpart";
import Icon from "../Icon/Icon";
import {Link} from "react-router/es";
import ChainTypes from "../Utility/ChainTypes";
import FormattedAsset from "../Utility/FormattedAsset";
import BindToChainState from "../Utility/BindToChainState";
import utils from "common/utils";
import BorrowModal from "../Modal/BorrowModal";
import ReactTooltip from "react-tooltip";
import SimpleDepositWithdraw from "../Dashboard/SimpleDepositWithdraw";
import SimpleDepositBlocktradesBridge from "../Dashboard/SimpleDepositBlocktradesBridge";
import { Apis } from "bitsharesjs-ws";
import GatewayActions from "actions/GatewayActions";
import {Tabs, Tab} from "../Utility/Tabs";
import AccountOrders from "./AccountOrders";
import cnames from "classnames";
import TranslateWithLinks from "../Utility/TranslateWithLinks";

class AccountOverview extends React.Component {

    static propTypes = {
        balanceAssets: ChainTypes.ChainAssetsList
    };

    constructor() {
        super();
        this.state = {
            settleAsset: "1.3.0",
            showHidden: false,
            depositAsset: null,
            withdrawAsset: null,
            bridgeAsset: null,
            alwaysShowAssets: [
                "BTS",
                "USD",
                "CNY",
                "OPEN.BTC",
                "OPEN.USDT",
                "OPEN.ETH",
                "OPEN.MAID",
                "OPEN.STEEM",
                "OPEN.DASH"
            ]
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            !utils.are_equal_shallow(nextProps.balanceAssets, this.props.balanceAssets) ||
            !utils.are_equal_shallow(nextProps.backedCoins, this.props.backedCoins) ||
            !utils.are_equal_shallow(nextProps.balances, this.props.balances) ||
            nextProps.account !== this.props.account ||
            nextProps.settings !== this.props.settings ||
            nextProps.hiddenAssets !== this.props.hiddenAssets ||
            !utils.are_equal_shallow(nextState, this.state)
        );
    }

    _onSettleAsset(id, e) {
        e.preventDefault();
        this.setState({
            settleAsset: id
        });

        this.refs.settlement_modal.show();
    }

    _hideAsset(asset, status) {
        SettingsActions.hideAsset(asset, status);
    }

    _showDepositWithdraw(action, asset, fiatModal, e) {
        e.preventDefault();
        this.setState({
            [action === "bridge_modal" ? "bridgeAsset" : action === "deposit_modal" ? "depositAsset" : "withdrawAsset"]: asset,
            fiatModal
        }, () => {
            this.refs[action].show();
        });
    }

    _getSeparator(render) {
        return render ? <span>&nbsp;|&nbsp;</span> : null;
    }

    _onNavigate(route, e) {
        e.preventDefault();
        this.props.router.push(route);
    }

    _renderBalances(balanceList, optionalAssets, visible) {
        const core_asset = ChainStore.getAsset("1.3.0");
        let {settings, hiddenAssets, orders} = this.props;
        let preferredUnit = settings.get("unit") || "1.3.0";
        let showAssetPercent = settings.get("showAssetPercent", false);

        const renderBorrow = (asset, account) => {
            let isBitAsset = asset && asset.has("bitasset_data_id");
            let modalRef = "cp_modal_" + asset.get("id");
            return {
                isBitAsset,
                borrowModal: !isBitAsset ? null : <BorrowModal
                    ref={modalRef}
                    quote_asset={asset.get("id")}
                    backing_asset={asset.getIn(["bitasset", "options", "short_backing_asset"])}
                    account={account}
                />,
                borrowLink: !isBitAsset ? null : <a onClick={() => {ReactTooltip.hide();this.refs[modalRef].show();}}><Icon name="dollar" className="icon-14px" /></a>
            };
        };

        let balances = [], openOrders = [];
        const emptyCell = "-";
        balanceList.forEach( balance => {
            let balanceObject = ChainStore.getObject(balance);
            let asset_type = balanceObject.get("asset_type");
            let asset = ChainStore.getObject(asset_type);

            let assetInfoLinks;
            let marketLink, directMarketLink, settleLink, transferLink;
            let symbol = "";
            if (!asset) return null;

            const assetName = asset.get("symbol");
            const notCore = asset.get("id") !== "1.3.0";
            let {market} = assetUtils.parseDescription(asset.getIn(["options", "description"]));
            symbol = asset.get("symbol");
            if (symbol.indexOf("OPEN.") !== -1 && !market) market = "USD";
            let preferredMarket = market ? market : core_asset ? core_asset.get("symbol") : "BTS";

            /* Table content */
            const assetDetailURL = `/asset/${asset.get("symbol")}`;
            const marketURL = `/market/${asset.get("symbol")}_${preferredMarket}`;

            marketLink = notCore ? <a href={marketURL} onClick={this._onNavigate.bind(this, marketURL)}><AssetName name={asset.get("symbol")} /> : <AssetName name={preferredMarket} /></a> : null;
            directMarketLink = notCore ? <Link to={`/market/${asset.get("symbol")}_${preferredMarket}`}><Icon name="trade" className="icon-14px" /></Link> : emptyCell;
            transferLink = <Link to={`/transfer?asset=${asset.get("id")}`}><Icon name="transfer" className="icon-14px" /></Link>;

            let {isBitAsset, borrowModal, borrowLink} = renderBorrow(asset, this.props.account);
            // if (isBitAsset) {


                // let modalRef = "cp_modal_" + asset.get("id");
                // borrowModal = <BorrowModal
                //     ref={modalRef}
                //     quote_asset={asset.get("id")}
                //     backing_asset={asset.getIn(["bitasset", "options", "short_backing_asset"])}
                //     account={this.props.account}
                // />;
                //
                // borrowLink = <a onClick={() => {ReactTooltip.hide();this.refs[modalRef].show();}}><Translate content="exchange.borrow" /></a>;
            // }

            /* Popover content */
            settleLink = <a href onClick={this._onSettleAsset.bind(this, asset.get("id"))}>
                <Icon name="settle" className="icon-14px" />
            </a>;
            assetInfoLinks = (
            <ul>
                <li><a href={assetDetailURL} onClick={this._onNavigate.bind(this, assetDetailURL)}><Translate content="account.asset_details"/></a></li>
                {notCore ? <li>{marketLink}</li> : null}
                {isBitAsset ? <li>{settleLink}</li> : null}
            </ul>);

            const includeAsset = !hiddenAssets.includes(asset_type);
            const hasBalance = !!balanceObject.get("balance");
            const hasOnOrder = !!orders[asset_type];
            const canDepositWithdraw = !!this.props.backedCoins.get("OPEN", []).find(a => a.symbol === asset.get("symbol"));
            const canWithdraw = canDepositWithdraw && (hasBalance && balanceObject.get("balance") != 0);
            const canBuy = !!this.props.bridgeCoins.get(symbol);

            let onOrders = hasOnOrder ? <FormattedAsset amount={orders[asset_type]} asset={asset_type} /> : null;

            if (hasOnOrder) {
                let goToLink = <Link to={`/account/${this.props.account.get("name")}/orders`}><Translate content="account.see_open" /></Link>;
                openOrders.push(
                    <tr key={asset.get("symbol")} style={{maxWidth: "100rem"}}>
                        <td style={{textAlign: "right"}}>
                            <div className="tooltip" data-place="bottom" data-tip={counterpart.translate("account.in_open", {asset: symbol})} style={{paddingTop: 8}}>{onOrders}</div>
                        </td>
                        <td style={{textAlign: "right"}} className="column-hide-small">
                            <div className="tooltip" data-place="bottom" data-tip={counterpart.translate("account.in_open_value", {asset: symbol})} style={{paddingTop: 8}}>
                                <EquivalentValueComponent amount={orders[asset_type]} fromAsset={asset_type} noDecimals={true} toAsset={preferredUnit}/>
                            </div>
                        </td>
                        <td colSpan="3" style={{textAlign: "center"}}>
                            {directMarketLink}
                            {directMarketLink ? <span> | </span> : null}
                            {goToLink}
                        </td>
                    </tr>
                );
            }
            balances.push(
                <tr key={asset.get("symbol")} style={{maxWidth: "100rem"}}>
                    <td><AssetName name={asset.get("symbol")} /></td>
                    <td style={{textAlign: "right"}}>
                        {hasBalance || hasOnOrder ? <BalanceComponent balance={balance} hide_asset /> : null}
                    </td>
                    <td style={{textAlign: "right"}} className="column-hide-small">
                        {hasBalance || hasOnOrder ? <BalanceValueComponent balance={balance} toAsset={preferredUnit} hide_asset/> : null}
                    </td>
                    {showAssetPercent ? <td style={{textAlign: "right"}}>
                        {hasBalance ? <BalanceComponent balance={balance} asPercentage={true}/> : null}
                    </td> : null}
                    <td>
                        {transferLink}
                    </td>
                    <td>
                        {canBuy && this.props.isMyAccount ?
                        <span>
                            <a onClick={this._showDepositWithdraw.bind(this, "bridge_modal", assetName, false)}>
                                <Icon name="dollar" className="icon-14px" />
                            </a>
                        </span> : emptyCell}
                    </td>
                    <td>
                        {canDepositWithdraw && this.props.isMyAccount? (
                            <span>
                                <a onClick={this._showDepositWithdraw.bind(this, "deposit_modal", assetName, false)}>
                                    <Icon name="deposit" className="icon-14px" />
                                </a>
                            </span>
                        ) : emptyCell}
                    </td>
                    <td>
                        {canWithdraw && this.props.isMyAccount? (
                            <span>
                                <a className={!canWithdraw ? "disabled" : ""} onClick={canWithdraw ? this._showDepositWithdraw.bind(this, "withdraw_modal", assetName, false) : () => {}}>
                                    <Icon name="withdraw" className="icon-14px" />
                                </a>
                            </span>
                        ) : emptyCell}
                    </td>
                    <td>
                        {directMarketLink}
                    </td>
                    <td>
                        {isBitAsset ? <div className="inline-block" data-place="bottom" data-tip={counterpart.translate("tooltip.borrow", {asset: symbol})}>{borrowLink}{borrowModal}</div> : emptyCell}
                    </td>
                    <td>
                        {isBitAsset ? <div className="inline-block" data-place="bottom" data-tip={counterpart.translate("tooltip.settle", {asset: symbol})}>{settleLink}</div> : emptyCell}
                    </td>
                    <td style={{textAlign: "center"}} className="column-hide-small" data-place="bottom" data-tip={counterpart.translate("tooltip." + (includeAsset ? "hide_asset" : "show_asset"))}>
                        <a style={{marginRight: 0}} className={includeAsset ? "order-cancel" : "action-plus"} onClick={this._hideAsset.bind(this, asset_type, includeAsset)}>
                            <Icon name={includeAsset ? "cross-circle" : "plus-circle"} className="icon-14px" />
                        </a>
                    </td>
                </tr>
            );
        });

        const currentIndex = balances.length;

        if (optionalAssets) {
            optionalAssets.filter(asset => {
                let isAvailable = false;
                this.props.backedCoins.get("OPEN", []).forEach(coin => {
                    if (coin && (coin.symbol === asset)) {
                        isAvailable = true;
                    }
                });
                if (!!this.props.bridgeCoins.get(asset)) {
                    isAvailable = true;
                }
                let keep = true;
                balances.forEach(a => {
                    if (a.key === asset) keep = false;
                });

                return keep && isAvailable;
            }).forEach(a => {
                let asset = ChainStore.getAsset(a);
                if (asset && this.props.isMyAccount) {
                    const includeAsset = !hiddenAssets.includes(asset.get("id"));

                    const canDepositWithdraw = !!this.props.backedCoins.get("OPEN", []).find(a => a.symbol === asset.get("symbol"));
                    const canBuy = !!this.props.bridgeCoins.get(asset.get("symbol"));

                    const notCore = asset.get("id") !== "1.3.0";
                    let {market} = assetUtils.parseDescription(asset.getIn(["options", "description"]));
                    if (asset.get("symbol").indexOf("OPEN.") !== -1 && !market) market = "USD";
                    let preferredMarket = market ? market : core_asset ? core_asset.get("symbol") : "BTS";
                    let directMarketLink = notCore ? <Link to={`/market/${asset.get("symbol")}_${preferredMarket}`}><Icon name="trade" className="icon-14px" /></Link> : emptyCell;
                    let {isBitAsset, borrowModal, borrowLink} = renderBorrow(asset, this.props.account);
                    if (includeAsset && visible || !includeAsset && !visible) balances.push(
                        <tr key={"zz" + a} style={{maxWidth: "100rem"}}>
                            <td>
                                <AssetName name={a} />
                            </td>
                            <td colSpan="3"></td>
                            <td style={{textAlign: "center"}}>
                                {canBuy  && this.props.isMyAccount ?
                                <span>
                                    <a onClick={this._showDepositWithdraw.bind(this, "bridge_modal", a, false)}>
                                        <Icon name="dollar" className="icon-14px" />
                                    </a>
                                </span> : emptyCell}
                            </td>
                            <td>
                                {canDepositWithdraw && this.props.isMyAccount ?
                                <span>
                                    <a onClick={this._showDepositWithdraw.bind(this, "deposit_modal", a, false)}>
                                        <Icon name="deposit" className="icon-14px" />
                                    </a>
                                </span> : emptyCell}
                            </td>
                            <td>{emptyCell}</td>
                            <td style={{textAlign: "center"}}>
                                {directMarketLink}
                            </td>
                            <td>
                                {isBitAsset ?
                                    <div className="inline-block" data-place="bottom" data-tip={counterpart.translate("tooltip.borrow", {asset: asset.get("symbol")})}>
                                        {borrowLink}{borrowModal}
                                    </div> : emptyCell}
                            </td>
                            <td>{emptyCell}</td>
                            <td style={{textAlign: "center"}} className="column-hide-small" data-place="bottom" data-tip={counterpart.translate("tooltip." + (includeAsset ? "hide_asset" : "show_asset"))}>
                                <a style={{marginRight: 0}} className={includeAsset ? "order-cancel" : "action-plus"} onClick={this._hideAsset.bind(this, asset.get("id"), includeAsset)}>
                                    <Icon name={includeAsset ? "cross-circle" : "plus-circle"} className="icon-14px" />
                                </a>
                            </td>
                        </tr>
                    );
                }
            });

            if (balances.length !== currentIndex) {
                balances.splice(currentIndex + 1, 0, <tr style={{backgroundColor: "transparent"}} key={"hidden_" + currentIndex} ><td style={{height: 20}} colSpan="11"></td></tr>);
            }
        }

        function sortAlphabetic(a, b) {
            if (a.key > b.key) return 1;
            if (a.key < b.key) return -1;
            return 0;
        };

        balances.sort(sortAlphabetic);
        openOrders.sort(sortAlphabetic);
        return {balances, openOrders};
    }

    _toggleHiddenAssets() {
        this.setState({
            showHidden: !this.state.showHidden
        });
    }

    render() {
        let {account, hiddenAssets, settings, orders} = this.props;
        let {showHidden} = this.state;

        if (!account) {
            return null;
        }

        let call_orders = [], collateral = {}, debt = {};

        if (account.toJS && account.has("call_orders")) call_orders = account.get("call_orders").toJS();
        let includedBalances, hiddenBalances, includedOrders, hiddenOrders;
        let account_balances = account.get("balances");

        let includedBalancesList = Immutable.List(), hiddenBalancesList = Immutable.List();
        call_orders.forEach( (callID) => {
            let position = ChainStore.getObject(callID);
            if (position) {
                let collateralAsset = position.getIn(["call_price", "base", "asset_id"]);
                if (!collateral[collateralAsset]) {
                    collateral[collateralAsset] = parseInt(position.get("collateral"), 10);
                } else {
                    collateral[collateralAsset] += parseInt(position.get("collateral"), 10);
                }
                let debtAsset = position.getIn(["call_price", "quote", "asset_id"]);
                if (!debt[debtAsset]) {
                    debt[debtAsset] = parseInt(position.get("debt"), 10);
                } else {
                    debt[debtAsset] += parseInt(position.get("debt"), 10);
                }
            }
        });

        if (account_balances) {
            // Filter out balance objects that have 0 balance or are not included in open orders
            account_balances = account_balances.filter((a, index) => {
                let balanceObject = ChainStore.getObject(a);
                if (balanceObject && (!balanceObject.get("balance") && !orders[index])) {
                    return false;
                } else {
                    return true;
                }
            });

            // Separate balances into hidden and included
            account_balances.forEach((a, asset_type) => {
                if (hiddenAssets.includes(asset_type)) {
                    hiddenBalancesList = hiddenBalancesList.push(a);
                } else {
                    includedBalancesList = includedBalancesList.push(a);
                }
            });

            let included = this._renderBalances(includedBalancesList, this.state.alwaysShowAssets, true);
            includedBalances = included.balances;
            includedOrders = included.openOrders;
            let hidden = this._renderBalances(hiddenBalancesList, this.state.alwaysShowAssets);
            hiddenBalances = hidden.balances;
            hiddenOrders = hidden.openOrders;
        }

        // if (hiddenBalances) {
        //     hiddenBalances.unshift(<tr style={{backgroundColor: "transparent"}} key="hidden"><td style={{height: 20}} colSpan="11"></td></tr>);
        // }

        let totalBalanceList = includedBalancesList.concat(hiddenBalancesList);

        let totalValue =
            <TotalBalanceValue
                noTip
                balances={totalBalanceList}
                openOrders={orders}
                debt={debt}
                collateral={collateral}
                hide_asset
            />;
        let portFolioValue =
            <TotalBalanceValue
                noTip
                balances={totalBalanceList}
                hide_asset
            />;
        let ordersValue =
            <TotalBalanceValue
                noTip
                balances={Immutable.List()}
                openOrders={orders}
                hide_asset
            />;
        let marginValue =
            <TotalBalanceValue
                noTip
                balances={Immutable.List()}
                debt={debt}
                collateral={collateral}
                hide_asset
            />;
        let debtValue =
            <TotalBalanceValue
                noTip
                balances={Immutable.List()}
                debt={debt}
                hide_asset
            />;
        let collateralValue =
            <TotalBalanceValue
                noTip
                balances={Immutable.List()}
                collateral={collateral}
                hide_asset
            />;

        const preferredUnit = settings.get("unit") || "1.3.0";
        const totalValueText = <TranslateWithLinks
            noLink
            string="account.total"
            keys={[
                {type: "asset", value: preferredUnit, arg: "asset"}
            ]}
        />;

        includedBalances.push(<tr key="portfolio" className="total-value"><td style={{textAlign: "center"}}>{totalValueText}</td><td></td><td style={{textAlign: "right"}}>{portFolioValue}</td><td colSpan="8"></td></tr>);

        let showAssetPercent = settings.get("showAssetPercent", false);

        // Find the current Openledger coins
        const currentDepositAsset = this.props.backedCoins.get("OPEN", []).find(c => {
            return c.symbol === this.state.depositAsset;
        }) || {};
        const currentWithdrawAsset = this.props.backedCoins.get("OPEN", []).find(c => {
            return c.symbol === this.state.withdrawAsset;
        }) || {};
        const currentBridges = this.props.bridgeCoins.get(this.state.bridgeAsset) || null;

        const preferredAsset = ChainStore.getAsset(preferredUnit);
        let assetName = !!preferredAsset ? preferredAsset.get("symbol") : "";
        if (preferredAsset) {
            const {prefix, name} = utils.replaceName(assetName, !!preferredAsset.get("bitasset_data_id"));
            assetName = (prefix || "") + name;
        }
        const hiddenSubText = <span style={{visibility: "hidden"}}>H</span>;

        return (
            <div className="grid-content" style={{overflowX: "hidden"}}>
                <div className="content-block small-12">
                    <div className="generic-bordered-box">
                        <Tabs defaultActiveTab={1} segmented={false} setting="overviewTab" className="overview-tabs" tabsClass="account-overview no-padding bordered-header content-block">

                            <Tab disabled className="total-value" title={<span>{counterpart.translate("account.eq_value")}&nbsp;<AssetName name={preferredUnit} noTip /></span>} subText={totalValue}>

                            </Tab>

                            <Tab title="account.portfolio" subText={portFolioValue}>
                                <div className="hide-selector">
                                    <div className={cnames("inline-block", {inactive: showHidden && hiddenBalances.length})} onClick={showHidden ? this._toggleHiddenAssets.bind(this) : () => {}}>
                                        <Translate content="account.hide_hidden" />
                                    </div>
                                    {hiddenBalances.length ? <div className={cnames("inline-block", {inactive: !showHidden})} onClick={!showHidden ? this._toggleHiddenAssets.bind(this) : () => {}}>
                                        <Translate content="account.show_hidden" />
                                    </div> : null}
                                </div>

                                <table className="table dashboard-table">
                                    <thead>
                                        <tr>
                                            {/*<th><Translate component="span" content="modal.settle.submit" /></th>*/}
                                            <th><Translate component="span" content="account.asset" /></th>
                                            <th style={{textAlign: "right"}}><Translate content="account.qty" /></th>
                                            {/*<<th style={{textAlign: "right"}}><Translate component="span" content="account.bts_market" /></th>*/}
                                            <th style={{textAlign: "right"}} className="column-hide-small">
                                                <TranslateWithLinks
                                                    noLink
                                                    string="account.eq_value_header"
                                                    keys={[
                                                        {type: "asset", value: preferredUnit, arg: "asset"}
                                                    ]}
                                                />
                                            </th>
                                            {showAssetPercent ? <th style={{textAlign: "right"}}><Translate component="span" content="account.percent" /></th> : null}
                                            <th><Translate content="header.payments" /></th>
                                            <th><Translate content="exchange.buy" /></th>
                                            <th><Translate content="modal.deposit.submit" /></th>
                                            <th><Translate content="modal.withdraw.submit" /></th>
                                            <th><Translate content="account.trade" /></th>
                                            <th><Translate content="exchange.borrow" /></th>
                                            <th><Translate content="account.settle" /></th>
                                            <th><Translate content={!showHidden ? "exchange.hide" : "account.perm.show"} /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {showHidden && hiddenBalances.length ? hiddenBalances : includedBalances}
                                    </tbody>
                                </table>
                            </Tab>

                            <Tab title="account.open_orders" subText={ordersValue}>
                                <AccountOrders {...this.props}>
                                    <tbody>
                                        <tr className="total-value">
                                            <td style={{textAlign: "center"}} colSpan="3">
                                                {totalValueText}
                                            </td>
                                            <td colSpan="3"></td>
                                            <td style={{textAlign: "center"}}>{ordersValue}</td>
                                            <td colSpan="1"></td>
                                            {this.props.isMyAccount ? <td></td> : null}
                                        </tr>
                                    </tbody>
                                </AccountOrders>
                            </Tab>

                            <Tab title="account.collaterals" subText={marginValue}>
                                <div className="content-block">
                                    <div className="generic-bordered-box">
                                        <CollateralPosition preferredUnit={preferredUnit} className="dashboard-table" callOrders={call_orders} account={account}>
                                            <tr className="total-value">
                                                <td>
                                                    {totalValueText}
                                                </td>
                                                <td>{debtValue}</td>
                                                <td>{collateralValue}</td>
                                                <td></td>
                                                <td>{marginValue}</td>
                                                <td colSpan="4"></td>
                                            </tr>
                                        </CollateralPosition>
                                    </div>
                                </div>
                            </Tab>

                            {/* <Tab title="markets.title" subText={hiddenSubText}>

                            </Tab> */}

                            <Tab title="account.activity" subText={hiddenSubText}>
                                <RecentTransactions
                                    accountsList={Immutable.fromJS([account.get("id")])}
                                    compactView={false}
                                    showMore={true}
                                    fullHeight={true}
                                    limit={15}
                                    showFilters={true}
                                    dashboard
                                />
                            </Tab>
                        </Tabs>



                        <SettleModal ref="settlement_modal" asset={this.state.settleAsset} account={account.get("name")}/>
                    </div>
                </div>

                {account.get("proposals") && account.get("proposals").size ?
                <div className="content-block">
                    <div className="block-content-header">
                        <Translate content="explorer.proposals.title" account={account.get("id")} />
                    </div>
                    <Proposals account={account.get("id")}/>
                </div> : null}

                {/* Deposit Modal */}
                <SimpleDepositWithdraw
                    ref="deposit_modal"
                    action="deposit"
                    fiatModal={this.state.fiatModal}
                    account={this.props.account.get("name")}
                    sender={this.props.account.get("id")}
                    asset={this.state.depositAsset}
                    modalId="simple_deposit_modal"
                    balances={this.props.balances}
                    {...currentDepositAsset}
                />

                {/* Withdraw Modal */}
                <SimpleDepositWithdraw
                    ref="withdraw_modal"
                    action="withdraw"
                    fiatModal={this.state.fiatModal}
                    account={this.props.account.get("name")}
                    sender={this.props.account.get("id")}
                    asset={this.state.withdrawAsset}
                    modalId="simple_withdraw_modal"
                    balances={this.props.balances}
                    {...currentWithdrawAsset}
                />

                {/* Bridge modal */}
                <SimpleDepositBlocktradesBridge
                    ref="bridge_modal"
                    action="deposit"
                    account={this.props.account.get("name")}
                    sender={this.props.account.get("id")}
                    asset={this.state.bridgeAsset}
                    modalId="simple_bridge_modal"
                    balances={this.props.balances}
                    bridges={currentBridges}
                />
            </div>

        );
    }
}

AccountOverview = BindToChainState(AccountOverview);

class BalanceWrapper extends React.Component {

    static propTypes = {
        balances: ChainTypes.ChainObjectsList,
        orders: ChainTypes.ChainObjectsList
    };

    static defaultProps = {
        balances: Immutable.List(),
        orders: Immutable.List()
    };

    componentWillMount() {
        if (Apis.instance().chain_id.substr(0, 8) === "4018d784") { // Only fetch this when on BTS main net
            GatewayActions.fetchCoins();
            GatewayActions.fetchBridgeCoins();
        }
    }

    render() {
        let balanceAssets = this.props.balances.map(b => {
            return b && b.get("asset_type");
        }).filter(b => !!b);

        let ordersByAsset = this.props.orders.reduce((orders, o) => {
            let asset_id = o.getIn(["sell_price", "base", "asset_id"]);
            if (!orders[asset_id]) orders[asset_id] = 0;
            orders[asset_id] += parseInt(o.get("for_sale"), 10);
            return orders;
        }, {});

        for (let id in ordersByAsset) {
            if (balanceAssets.indexOf(id) === -1) {
                balanceAssets.push(id);
            }
        }

        return (
            <AccountOverview {...this.state} {...this.props} orders={ordersByAsset} balanceAssets={Immutable.List(balanceAssets)} />
        );
    };
}

export default BindToChainState(BalanceWrapper);
