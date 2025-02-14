<template>
  <div>
    <h1>注文フォーム</h1>
    <ValidationObserver ref="orderform" v-slot="{ invalid }">
      <form @submit.prevent="sendOrder">
        <div class="Form-Item">
          <label class="Form-Item-Label">
            <span class="Form-Item-Label-Required">必須</span>氏名</label
          >
          <ValidationProvider
            v-slot="{ errors }"
            name="名前"
            rules="required|max:50"
          >
            <input
              id="Form-Item-name"
              v-model="destinationName"
              class="Form-Item-Input"
              placeholder="例）山田太郎"
              type="text"
            />
            <div class="validation-position">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>

        <div class="Form-Item">
          <label class="Form-Item-Label">
            <span class="Form-Item-Label-Required">必須</span>電話番号</label
          >
          <ValidationProvider
            v-slot="{ errors }"
            name="電話番号"
            rules="required|numeric|min:10|max:11"
          >
            <input
              v-model="destinationTel"
              class="Form-Item-Input"
              placeholder="例）0000000000"
              type="text"
            />
            <div class="validation-position">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>

        <div class="Form-Item">
          <label class="Form-Item-Label">
            <span class="Form-Item-Label-Required">必須</span
            >メールアドレス</label
          >
          <ValidationProvider
            v-slot="{ errors }"
            name="メールアドレス"
            rules="required|email|"
          >
            <input
              v-model="destinationEmail"
              class="Form-Item-Input"
              placeholder="例）sample@gmail.com"
              type="text"
            />
            <div class="validation-position">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>

        <div class="Form-Item">
          <label class="Form-Item-Label">
            <span class="Form-Item-Label-Required">必須</span>郵便番号</label
          >
          <ValidationProvider
            v-slot="{ errors }"
            name="郵便番号"
            rules="required|digits:7"
            :validate="{
              required: true,
              regex: /^[0-9]+$/,
            }"
          >
            <input
              v-model="destinationZipcode"
              class="Form-Item-Input"
              placeholder="例）0000000"
              type="text"
            />
            <div class="validation-position">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>

        <div class="Form-Item">
          <label class="Form-Item-Label">
            <span class="Form-Item-Label-Required">必須</span>住所</label
          >
          <ValidationProvider v-slot="{ errors }" rules="required">
            <input
              v-model="destinationAddress"
              class="Form-Item-Input"
              name="住所"
              placeholder="例）東京都×××区××1丁目"
              type="text"
            />
            <div class="validation-position">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>

        <div class="Form-Item">
          <label class="Form-Item-Label">
            <span class="Form-Item-Label-Required">必須</span>配達日</label
          >
          <ValidationProvider
            v-slot="{ errors }"
            name="配達日"
            rules="required|date"
          >
            <input
              v-model="destinationDate"
              class="Form-Item-Input"
              name="配達日"
              type="date"
            />
            <div class="validation-position">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>

        <div class="Form-Item">
          <label class="Form-Item-Label">
            <span class="Form-Item-Label-Required">必須</span>配達時間</label
          >
          <ValidationProvider v-slot="{ errors }" rules="required">
            <select
              v-model="destinationTime"
              class="Form-Item-Select"
              name="配達時間"
            >
              <option hidden>選択してください</option>
              <option value="8:00-21:00">指定なし</option>
              <option value="8:00-12:00">午前（8:00-12:00）</option>
              <option value="12:00-17:00">午後（12:00-17:00）</option>
              <option value="17:00-21:00">夜間（17:00-21:00）</option>
            </select>
            <div class="validation-position">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>

        <div class="Form-Item">
          <label class="Form-Item-Label">
            <span class="Form-Item-Label-Required">必須</span>支払い方法</label
          >
          <ValidationProvider v-slot="{ errors }" rules="required">
            <input
              v-model="paymentMethod"
              class="Form-Item-Radio"
              :paymentCredit="false"
              name="支払い方法"
              type="radio"
              value="1"
              checked
              @click="paymentCredit = !paymentCredit"
            /><span class="Form-Item-Radio-Name">代金引換</span>
            <input
              v-model="paymentMethod"
              class="Form-Item-Radio2"
              name="支払い方法"
              type="radio"
              value="2"
              @click="paymentCredit = 'true'"
            /><span class="Form-Item-Radio-Name">クレジット</span>
            <div class="validation-position">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>

        <div v-if="paymentCredit" class="Form-Item">
          <label class="Form-Item-Label">
            <span class="Form-Item-Label-Required">必須</span
            >クレジット番号</label
          >

          <ValidationProvider
            v-slot="{ errors }"
            :rules="{
              required: true,
              regex: /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
            }"
          >
            <input
              v-model="creditCardNumber"
              class="Form-Item-Input"
              placeholder="例）1111-1111-1111-1111"
              name="クレジット番号"
              type="text"
            />

            <div class="validation-position">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>

        <button type="submit" :disabled="invalid" class="Form-Btn">注文</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    orderId: {
      type: String,
      default: '',
      required: true,
    },
  },

  data() {
    return {
      destinationName: '',
      destinationTel: '',
      destinationEmail: '',
      destinationZipcode: '',
      destinationAddress: '',
      destinationDate: '',
      paymentMethod: '1',
      creditCardNumber: '',

      paymentCredit: false,
      selectedDestinationDate: false,
      destinationTime: '',
    }
  },
  computed: {
    nowDay() {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth() + 1
      const day = today.getDate()

      return String(year + '-' + month + '-' + day)
    },
  },
  methods: {
    sendOrder() {
      if (confirm('注文を確定しますか?')) {
        const orderDetails = {
          // userId: this.$auth.user.id,
          userId: this.$store.state.auth.user.id,
          orderId: this.orderId,
          status: Number(this.paymentMethod),
          // 注文入力フォームのデータ
          destinationName: this.destinationName,
          destinationEmail: this.destinationEmail,
          destinationZipcode: this.destinationZipcode,
          destinationAddress: this.destinationAddress,
          destinationTel: this.destinationTel,
          destinationDate: this.destinationDate + ':' + this.destinationTime,
          paymentMethod: this.paymentMethod,
          creditCardNumber: this.creditCardNumber,
          // 注文ボタンを押したときの日時
          orderDate: new Date().toString(),
        }
        this['order/sendOrder'](orderDetails)
      }
    },
    ...mapActions(['order/sendOrder']),
  },
}
</script>

<style lang="scss" scoped>
.validation-position {
  margin-top: 5px;
  margin-left: 100px;
}
h1 {
  margin-top: 30px;
  text-align: center;
}
.Form {
  margin-top: 80px;
  max-width: 720px;
}
.Form-Item {
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px 20px 10px 50px;
  display: flex;
  align-items: center;
  margin-left: 200px;
  margin-right: 200px;
}
.Form-Item:nth-child(5) {
  border-bottom: 1px solid #ddd;
}
.Form-Item-Label {
  width: 100%;
  max-width: 200px;
  letter-spacing: 0.05em;
  font-weight: bold;
  font-size: 18px;
}
.Form-Item-Label.isMsg {
  margin-top: 8px;
  margin-bottom: auto;
}
.Form-Item-Label-Required {
  border-radius: 6px;
  margin-right: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 48px;
  display: inline-block;
  text-align: center;
  background: #5bc8ac;
  color: #fff;
  font-size: 14px;
}
.Form-Item-Input {
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-left: 100px;
  padding-left: 1em;
  padding-right: 1em;
  height: 28px;
  flex: 1;
  width: 280px;
  max-width: 410px;
  background: #eaedf2;
  font-size: 18px;
}
.Form-Item-Select {
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-left: 100px;
  margin-right: 5px;
  padding-left: 1em;
  padding-right: 1em;
  height: 28px;
  flex: 1;
  width: 315px;
  max-width: 315px;
  background: #eaedf2;
  font-size: 18px;
}
.Form-Item-Radio {
  font-size: 18px;
  margin-left: 80px;
  width: 0.9em;
  height: 0.9em;
}
.Form-Item-Radio2 {
  font-size: 18px;
  margin-left: 50px;
  width: 0.9em;
  height: 0.9em;
}
.Form-Item-Radio-Name {
  font-size: 18px;
}
.Form-Btn {
  border-radius: 6px;
  margin-top: 32px;
  padding: 10px 5px 10px 5px;
  width: 80px;
  display: block;
  letter-spacing: 0.05em;
  background: #5bc8ac;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 20px;
  cursor: pointer;
}

@media screen and (max-width: 1024px) {
  .validation-position {
    margin-left: 50px;
  }
  .Form {
    margin-top: 80px;
    max-width: 720px;
  }
  .Form-Item {
    margin-left: 40px;
    margin-right: 40px;
  }

  .Form-Item-Label {
    width: 100%;
    max-width: 200px;
    letter-spacing: 0.05em;
    font-weight: bold;
    font-size: 16px;
  }
  .Form-Item-Label.isMsg {
    margin-top: 8px;
    margin-bottom: auto;
  }
  .Form-Item-Label-Required {
    border-radius: 6px;
    margin-right: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    width: 36px;
    display: inline-block;
    text-align: center;
    font-size: 14px;
  }
  .Form-Item-Input {
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-left: 30px;
    padding-left: 1em;
    padding-right: 1em;
    height: 28px;
    flex: 1;
    width: 250px;
    max-width: 410px;
    font-size: 16px;
  }
  .Form-Item-Select {
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-left: 30px;
    margin-right: 5px;
    padding-left: 1em;
    padding-right: 1em;
    height: 28px;
    flex: 1;
    width: 280px;
    max-width: 280px;
    background: #eaedf2;
    font-size: 16px;
  }
  .Form-Item-Radio {
    font-size: 16px;
    margin-left: 0px;
    width: 0.9em;
    height: 0.9em;
  }
  .Form-Item-Radio2 {
    font-size: 16px;
    margin-left: 50px;
    width: 0.9em;
    height: 0.9em;
  }
  .Form-Item-Radio-Name {
    font-size: 16px;
  }
  .Form-Btn {
    border-radius: 6px;
    margin-top: 32px;
    padding: 10px 5px 10px 5px;
    width: 80px;
    display: block;
    letter-spacing: 0.05em;
    background: #5bc8ac;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 20px;
    cursor: pointer;
  }
}

// スマホ対応
@media screen and (max-width: 650px) {
  .validation-position {
    margin-left: 20px;
  }
  .Form {
    margin-top: 80px;
    max-width: 720px;
  }
  .Form-Item {
    padding: 8px 10px 8px 10px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
  }

  .Form-Item-Label {
    width: 100%;
    max-width: 120px;
    letter-spacing: 0.05em;
    font-size: 12px;
  }
  .Form-Item-Label.isMsg {
    margin-top: 8px;
    margin-bottom: auto;
  }
  .Form-Item-Label-Required {
    border-radius: 6px;
    margin-right: 8px;
    padding-top: 5px;
    padding-bottom: 5px;
    width: 32px;
    display: inline-block;
    text-align: center;
    font-size: 10px;
  }
  .Form-Item-Input {
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-left: 5px;
    padding-left: 1em;
    padding-right: 1em;
    height: 28px;
    flex: 1;
    width: 150px;
    max-width: 150px;
    font-size: 12px;
  }
  .Form-Item-Select {
    margin-left: 5px;
    margin-right: 5px;
    padding-left: 1em;
    padding-right: 1em;
    height: 28px;
    width: 200px;
    max-width: 175px;
    font-size: 12px;
  }
  .Form-Item-Radio {
    font-size: 12px;
    margin-left: 5px;
    width: 0.9em;
    height: 0.9em;
  }
  .Form-Item-Radio2 {
    font-size: 12px;
    margin-left: 20px;
    width: 0.9em;
    height: 0.9em;
  }
  .Form-Item-Radio-Name {
    font-size: 12px;
  }
  .Form-Btn {
    border-radius: 6px;
    margin-top: 32px;
    padding: 10px 5px 10px 5px;
    width: 60px;
    display: block;
    letter-spacing: 0.05em;
    font-weight: bold;
    font-size: 12px;
    margin: 0 auto;
    margin-top: 20px;
  }
}
</style>
