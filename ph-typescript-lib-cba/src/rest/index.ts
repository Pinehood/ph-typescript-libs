import { RESTBase } from '../utils';
import { AccountsAPI } from './accounts';
import { ConvertsAPI } from './converts';
import { FeesAPI } from './fees';
import { FuturesAPI } from './futures';
import { OrdersAPI } from './orders';
import { PaymentsAPI } from './payments';
import { PerpetualsAPI } from './perpetuals';
import { PortfoliosAPI } from './portfolios';
import { ProductsAPI } from './products';
import { PublicAPI } from './public';

export class RESTClient extends RESTBase {
  public readonly accounts: AccountsAPI;
  public readonly converts: ConvertsAPI;
  public readonly fees: FeesAPI;
  public readonly futures: FuturesAPI;
  public readonly orders: OrdersAPI;
  public readonly payments: PaymentsAPI;
  public readonly perpetuals: PerpetualsAPI;
  public readonly portfolios: PortfoliosAPI;
  public readonly products: ProductsAPI;
  public readonly public: PublicAPI;

  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    sandbox?: boolean | undefined,
    logger?: (message: string) => void
  ) {
    super(key, secret, sandbox, logger);
    this.accounts = new AccountsAPI(key, secret, sandbox, logger);
    this.converts = new ConvertsAPI(key, secret, sandbox, logger);
    this.fees = new FeesAPI(key, secret, sandbox, logger);
    this.futures = new FuturesAPI(key, secret, sandbox, logger);
    this.orders = new OrdersAPI(key, secret, sandbox, logger);
    this.payments = new PaymentsAPI(key, secret, sandbox, logger);
    this.perpetuals = new PerpetualsAPI(key, secret, sandbox, logger);
    this.portfolios = new PortfoliosAPI(key, secret, sandbox, logger);
    this.products = new ProductsAPI(key, secret, sandbox, logger);
    this.public = new PublicAPI(undefined, undefined, sandbox, logger);
  }
}
