

var vueApp = new Vue({
  el: '#vue-app',
  data: {
    /**
     * CONST配下は書き換えを想定していないオブジェクトです。書き換えないでください。
     */
    CONST: {
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
    },
    /**
     * 状態です。stateはmutationsの実行により、頻繁に書き換えられます。
     */
    state: {
      base: {
        checkboxObj: {
        },
      },
      rice: {
        isShow: true,
      },
      bread: {
        isShow: true,
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
            self.state.rice.isShow = action.state.rice.isShow;
            self.state.bread.isShow = action.state.bread.isShow;
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
  },
  methods: {
    /**
     * ActionCreatorsを定義
     * アクションオブジェクトを生成するメソッド群
     */
    /**
     * カテゴリ選択でごはんとパン両方を選択した場合
     */
    baseCategorySelectRiceAndBread: function(){
      var action = {
        type: 'rice_and_bread',
        state: {
          rice: {
            isShow: true,
          },
          bread: {
            isShow: true,
          },
        },
      };
      this.$emit('dispatch', action);
    },
    /**
     * カテゴリ選択でごはんのみを選択した場合
     */
    baseCategorySelectRiceOnly: function(){
      var action = {
        type: 'rice_only',
        state: {
          rice: {
            isShow: true,
          },
          bread: {
            isShow: false,
          },
        },
      };
      this.$emit('dispatch', action);
    },
    /**
     * カテゴリ選択でパンのみを選択した場合
     */
    baseCategorySelectBreadOnly: function(){
      var action = {
        type: 'bread_only',
        state: {
          rice: {
            isShow: false,
          },
          bread: {
            isShow: true,
          },
        },
      };
      this.$emit('dispatch', action);
    },
    /**
     * checkboxが複数並んでいる場合
     */
    baseCheckboxChanged: function(event){
      var checkboxObj = {},
        parentElm = event.path[1],
        items = parentElm.querySelectorAll('input[type="checkbox"]');

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
