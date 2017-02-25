
(function(){


/**
 * サーバーサイドから渡されるオブジェクト
 */
var CONST = {
  base: {
    title: 'ベースとなる質問です。',
    categorySelect: {
      title: 'カテゴリを選んでください。',
    },
    checkboxObj: {
      title: 'チェックボックスのサンプルです。',
    },
  },
  rice: {
    title: 'ごはんに関する質問です。',
  },
  bread: {
    title: 'パンに関する質問です。',
  },
};





/**
 * VueModel
 */
var vueApp = new Vue({
  el: '#vue-app',
  data: {
    /**
     * CONST配下は書き換えを想定していないオブジェクトです。
     * 書き換えできてしまいますが、書き換えないでください。
     */
    CONST: CONST,

    /**
     * v-modelで束縛しているプロパティです。初期値もここで設定しています。
     */
    valCategorySelect: 'bread_only',

    /**
     * 状態です。stateはmutationsを実行することによってのみ書き換えることとします。
     * 「表示・非表示」、「有効・無効」、「文字列などのコンテンツ内容」の状態を管理しています。
     */
    state: {
      baseComponent: {
        checkboxObj: {
        },
      },
      riceComponent: {
        isDisabled: false,
      },
      breadComponent: {
        isDisabled: false,
      },
    },
  },
  created: function(){
    /**
     * mutaionsを定義
     * stateを変化させる関数群
     */
    var self = this;
    const mutations = {
      categorySelect: function(action){
        switch (action.type) {
          case 'rice_and_bread':
          case 'rice_only':
          case 'bread_only':
            self.state.riceComponent.isDisabled = action.state.riceComponent.isDisabled;
            self.state.breadComponent.isDisabled = action.state.breadComponent.isDisabled;
            break;
          default:
        };
      },
    };
    // dispatchイベントのリスニングを開始
    this.$on('dispatch', function(action){
      mutations.categorySelect(action);
    });
  },
  mounted: function(){
    // 初期化処理
    this.actCategorySelect();
  },
  methods: {
    /**
     * ActionCreatorsを定義
     * アクションオブジェクトを生成するメソッド群
     */
    /**
     * カテゴリ選択
     */
    actCategorySelect: function(){
      var action = {};
      var actionType = this.valCategorySelect;

      switch (actionType) {
        case 'rice_and_bread':
          action = {
            type: actionType,
            state: {
              riceComponent: {
                isDisabled: false,
              },
              breadComponent: {
                isDisabled: false,
              },
            },
          };
          break;
        case 'rice_only':
          action = {
            type: actionType,
            state: {
              riceComponent: {
                isDisabled: false,
              },
              breadComponent: {
                isDisabled: true,
              },
            },
          };
          break
        case 'bread_only':
          action = {
            type: actionType,
            state: {
              riceComponent: {
                isDisabled: true,
              },
              breadComponent: {
                isDisabled: false,
              },
            },
          };
          break;
        default:
      }

      this.$emit('dispatch', action);
    },

    /**
     * checkboxが複数並んでいる場合
     */
    baseCheckboxChanged: function(event){
      var checkboxObj = {},
        wrapperElm = event.path[1],
        items = wrapperElm.querySelectorAll('input[type="checkbox"]');

      for(var i = 0; i < items.length; i++){
        checkboxObj[items[i].value] = items[i].checked;
      }

      var action = {
        type: 'base_checkbox_changed',
        state: {
          base: {
            checkboxObj: checkboxObj,
          },
        },
      };

      console.log(checkboxObj);
      this.$emit('dispatch', action);
    },
    /**
     * 家庭用ごはんのメニューを選択した場合
     */
    riceMenuSelectHousehold: function(){
      console.log('家庭用ごはん');
    },
    /**
     * 業務用ごはんのメニューを選択した場合
     */
    riceMenuSelectBiz: function(){
      console.log('業務用ごはん');
    },
    /**
     * 家庭用パンのメニューを選択した場合
     */
    breadMenuSelectHousehold: function(){
      console.log('家庭用パン');
    },
    /**
     * 業務用パンのメニューを選択した場合
     */
    breadMenuSelectBiz: function(){
      console.log('業務用パン');
    },
  },
});






})();
