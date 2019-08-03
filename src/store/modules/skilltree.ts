import { Module } from 'vuex';

export default class Store implements Module<any, any> {
  public namespaced: boolean = true;
}
