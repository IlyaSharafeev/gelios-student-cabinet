<script setup lang="ts">
import SelectInput from "@/components/inputs/SelectInput.vue";
import ukrainianLanguageIcon from "@/assets/images/language-icons/UA.svg";
import englishLanguageIcon from "@/assets/images/language-icons/GB.svg";
import { ref, watch, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs, helpers } from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth.ts";
import { useRouter } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { notify } = useNotification();
const phoneNumber = helpers.regex(/^\+?[1-9]\d{1,14}$/); // Simple phone number regex (e.g., +380123456789)
const router = useRouter();
const errorMessage = ref<string | null>(null);

const selectOptions = [
  { value: "ua", label: t("language.uk"), icon: ukrainianLanguageIcon },
  { value: "en", label: t("language.en"), icon: englishLanguageIcon },
];

const selectedValueLanguage = ref<string>(
    localStorage.getItem("selectedLanguage") || "ua"
);

const registerForm = ref({
  email: "",
  username: "",
  contactNumber: "",
  password: "",
  // confirmPassword: "",
});

const registerRules = computed(() => ({
  email: { required, email },
  username: {
    required,
    minLength: minLength(3),
    // Updated regex: Allows letters (Latin and Cyrillic), spaces, hyphens, and apostrophes, but explicitly disallows digits.
    alpha: helpers.regex(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s\-'’]*$/),
  },
  contactNumber: { required, phoneNumber },
  password: { required, minLength: minLength(6) },
  // confirmPassword: { required, sameAs: sameAs(registerForm.value.password) },
}));

const vRegister = useVuelidate(registerRules, registerForm);

const authStore = useAuthStore();

const onRegisterSubmit = async () => {
  const isValid = await vRegister.value.$validate();
  if (isValid) {
    const { success, error } = await authStore.register(registerForm.value);
    if (success) {
      router.push("/dashboard");
    } else {
      console.log(error);
      errorMessage.value = error;
    }
  } else {
    notify({
      title: t("register.validation.form_error"),
    });
  }
};

watch(selectedValueLanguage, (newValue) => {
  localStorage.setItem("selectedLanguage", newValue);
});
</script>

<template>
  <div class="register-page">
    <div class="background-gradient">
      <div class="content">
        <div class="logo"></div>
        <div class="text">
          <div class="title">
            {{ t("register.welcome.title") }}
          </div>
          <div class="description">
            {{ t("register.welcome.description") }}
            <div class="second-description">
              {{ t("register.welcome.second_description") }}
            </div>
          </div>
        </div>
      </div>
      <div class="woman-lego-wrapper">
        <div class="woman-lego"></div>
      </div>
    </div>

    <div class="register-form-wrapper">
      <div class="register-form">
        <div class="title">{{ t("register.form.title") }}</div>
        <div class="description">
          {{ t("register.form.description") }} <span class="name-company cursor-pointer">Gelios School</span>
        </div>
        <div class="form">
          <div class="form-email">
            <div class="label">{{ t("register.form.email.label") }}</div>
            <div class="field-email">
              <input
                  class="input"
                  :class="{ 'input-error': vRegister.email.$error }"
                  type="email"
                  :placeholder="t('register.form.email.placeholder')"
                  v-model="registerForm.email"
                  @blur="vRegister.email.$touch"
              />
              <div class="error-message" v-if="vRegister.email.$error">
                {{ vRegister.email.$errors[0].$message || t("register.validation.email") }}
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-username">
              <div class="label">{{ t("register.form.username.label") }}</div>
              <div class="field-username">
                <input
                    class="input"
                    :class="{ 'input-error': vRegister.username.$error }"
                    type="text"
                    :placeholder="t('register.form.username.placeholder')"
                    v-model="registerForm.username"
                    @blur="vRegister.username.$touch"
                    pattern="^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s\-'’]*$"
                    title="Имя пользователя должно содержать только буквы, пробелы, дефисы и апострофы."
                />
                <div class="error-message" v-if="vRegister.username.$error">
                  <template v-if="vRegister.username.required.$invalid">{{ t("register.validation.username_required") }}</template>
                  <template v-else-if="vRegister.username.minLength.$invalid">{{ t("register.validation.username_min_length") }}</template>
                  <template v-else-if="vRegister.username.alpha.$invalid">{{ t("register.validation.username_alpha_only") }}</template>
                  <template v-else>{{ t("register.validation.username") }}</template>
                </div>
              </div>
            </div>
            <div class="form-contact-number">
              <div class="label">{{ t("register.form.contact_number.label") }}</div>
              <div class="field-contact-number">
                <input
                    class="input"
                    :class="{ 'input-error': vRegister.contactNumber.$error }"
                    type="tel"
                    :placeholder="t('register.form.contact_number.placeholder')"
                    v-model="registerForm.contactNumber"
                    @blur="vRegister.contactNumber.$touch"
                />
                <div class="error-message" v-if="vRegister.contactNumber.$error">
                  {{ vRegister.contactNumber.$errors[0].$message || t("register.validation.contact_number") }}
                </div>
              </div>
            </div>
          </div>
          <div class="form-password">
            <div class="label">{{ t("register.form.password.label") }}</div>
            <div class="field-password">
              <input
                  class="input"
                  :class="{ 'input-error': vRegister.password.$error }"
                  type="password"
                  :placeholder="t('register.form.password.placeholder')"
                  v-model="registerForm.password"
                  @blur="vRegister.password.$touch"
              />
              <div class="error-message" v-if="vRegister.password.$error">
                {{ vRegister.password.$errors[0].$message || t("register.validation.password") }}
              </div>
            </div>
          </div>
        </div>
        <div class="button register-button" @click="onRegisterSubmit">{{ t("register.form.submit") }}</div>
        <div class="do-you-have-account">
          {{ t("register.form.have_account") }}
          <router-link class="back-to-login" to="/login">{{ t("register.form.login_link") }}</router-link>
        </div>
      </div>
    </div>

    <notifications />

    <SelectInput
        class="select-language"
        v-model="selectedValueLanguage"
        :options="selectOptions"
        :isSelectFirstOptionDefault="true"
    />
  </div>
</template>

<style scoped lang="scss">
.register-page {
  .background-gradient {
    position: relative;
    height: 450px;
    padding: 35px 60px;
    display: flex;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(331.12deg, #FF6A6A 9.04%, #FFB8B8 110.87%);
      z-index: -1;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 30px;
      max-width: 435px;
      z-index: 2;

      .logo {
        background-image: url("@/assets/images/logo/logo.svg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 64px;
        height: 64px;
      }

      .text {
        display: flex;
        flex-direction: column;
        gap: 30px;

        .title {
          font-size: 40px;
          color: #ffffff;
          font-family: "Onest", sans-serif;
          font-optical-sizing: auto;
          font-weight: 600;
          font-style: normal;
        }

        .description {
          font-family: "Onest", sans-serif;
          font-optical-sizing: auto;
          font-weight: 300;
          font-size: 16px;
          line-height: 100%;
          color: #ffffff;

          .second-description {
            font-family: "Onest", sans-serif;
            font-optical-sizing: auto;
            font-weight: 300;
            font-size: 16px;
            line-height: 100%;
            color: #ffffff;
            margin-top: 30px;
          }
        }
      }
    }

    .woman-lego-wrapper {
      position: relative;
      z-index: 10;

      .woman-lego {
        position: absolute;
        bottom: -46px;
        left: -170px;
        background-image: url("@/assets/images/lego-models/woman-with-phone.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 662px;
        height: 372px;
      }
    }
  }

  .register-form-wrapper {
    width: 539px;
    position: absolute;
    right: 69px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 59px;

    .register-form {
      padding: 39px 44px;
      border-radius: 40px;
      box-shadow: 0px 25px 42.9px -18px #0066ff5c;
      background-color: #ffffff;
      z-index: 2;

      .title {
        font-family: "Onest", sans-serif;
        font-weight: 600;
        font-size: 48px;
        line-height: 100%;
        letter-spacing: -2%;
      }

      .description {
        margin-top: 5px;
        font-family: Onest;
        font-weight: 400;
        font-size: 21px;
        line-height: 100%;
        letter-spacing: 0%;
        color: #888888;

        .name-company {
          color: #0066ff;
        }
      }

      .form {
        margin-top: 53px;
        display: flex;
        flex-direction: column;
        gap: 22px;

        .form-row {
          display: flex;
          gap: 16px;
        }

        .form-email,
        .form-username,
        .form-contact-number,
        .form-password,
        .form-confirm-password {
          flex: 1;

          .label {
            font-family: Onest;
            font-weight: 400;
            font-size: 16px;
            line-height: 100%;
            letter-spacing: 0%;
            color: #30303d;
            margin-bottom: 17px;
          }

          .field-email,
          .field-username,
          .field-contact-number,
          .field-password,
          .field-confirm-password {
            .input {
              width: 100%;
              padding: 12px 16px;
              border: 1px solid #d0d0d0;
              border-radius: 8px;
              font-family: Onest;
              font-size: 16px;
              line-height: 100%;
              color: #30303d;
              outline: none;
              transition: border-color 0.3s;

              &:focus {
                border-color: #0066ff;
              }
            }

            .input-error {
              border-color: #ff0000;
            }

            .error-message {
              color: #ff0000;
              font-family: Onest;
              font-size: 14px;
              margin-top: 8px;
            }
          }
        }

        .form-username,
        .form-contact-number {
          flex: 1;
        }
      }

      .register-button {
        margin-top: 35px;
        background-color: #0066ff;
        color: #ffffff;
        padding: 16px;
        border-radius: 16px;
        text-align: center;
        cursor: pointer;
        font-family: Onest;
        font-weight: 600;
        font-size: 18px;

        &:hover {
          background-color: #0055cc;
        }
      }

      .do-you-have-account {
        display: flex;
        justify-content: center;
        margin-top: 15px;
        font-family: "Onest" sans-serif;
        font-weight: 500;
        font-size: 16px;
        line-height: 100%;
        letter-spacing: 0%;

        .back-to-login {
          margin-left: 5px;
          color: #0066FF;
        }
      }
    }

    .login-button {
      text-decoration: none;
      display: flex;
      justify-content: center;
      background-color: #454a53;
      border-radius: 16px;
      padding: 16px;
      font-weight: 600;
      font-size: 18px;
      color: #ffffff;
      width: 100%;
      cursor: pointer;
      font-family: Onest;

      &:hover {
        background-color: #3a3f47;
      }
    }
  }

  .select-language {
    margin: 60px;
  }
}
</style>