import { Session } from '@shopify/shopify-api/dist/auth/session';
const faunadb = require('faunadb');
const q = faunadb.query;

class FaunaDbStore {
  private client: any;

  constructor() {
    this.client = new faunadb.Client({ secret: process.env.FAUNA_DB_KEY });
  }

  /**
   * checkForStore
   */
  public async createSession() {
    this.client.query(
      q.Create(q.Collection('sessions'), { data: { sessionId: 'example' } })
    );
  }

  public async getSession() {}

  storeCallback = async (session: Session) => {
    console.log('store attempted');
    try {
      return await this.client.query(
        q.Create(q.Collection('sessions'), {
          data: { sessionId: session.id, sessionData: JSON.stringify(session) },
        })
      );
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  loadCallback = async (id: string) => {
    console.log('load attempted');
    try {
      let reply = await this.client.query(
        q.Get(q.Match(q.Index('SessionIDs'), id))
      );
      if (reply) {
        console.log('load attempt found a record');
        return JSON.parse(reply.data.sessionData);
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  deleteCallback = async (id: string) => {
    console.log('delete attempted');
    try {
      let sessionObject = await this.client.query(
        q.Get(q.Match(q.Index('SessionIDs'), id))
      );

      // this takes the session object, nests in to the ref, and returns the important number
      let ref = sessionObject.ref.toString().replace(/\D/g, '');
      return await this.client.query(
        q.Delete(q.Ref(q.Collection('sessions'), ref))
      );
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
}

export default FaunaDbStore;
