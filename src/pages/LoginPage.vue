<script setup lang="ts">
import SelectInput from "@/components/inputs/SelectInput.vue";
import ukrainianLanguageIcon from "@/assets/images/language-icons/UA.svg";
import englishLanguageIcon from "@/assets/images/language-icons/GB.svg";
import { ref, watch, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import {Notifications, useNotification} from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";

const { notify } = useNotification();
const { t, locale } = useI18n();

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

console.log("login page")

const selectOptions = [
  { value: "uk", label: t("language.uk"), icon: ukrainianLanguageIcon },
  { value: "en", label: t("language.en"), icon: englishLanguageIcon },
  // { value: "ru", label: t("language.ru"), icon: englishLanguageIcon },
];

const selectedValueLanguage = ref<string>(
    localStorage.getItem("selectedLanguage") || "uk"
);

// Sync initial locale with i18n
locale.value = selectedValueLanguage.value;

const isPasswordRecoveryVisible = ref<boolean>(false);
const isRecoverySuccess = ref<boolean>(false);
const isResetPasswordVisible = ref<boolean>(route.path === '/reset-password' && !!route.query.token);
const errorMessage = ref<any>(null);

const loginForm = ref({
  email: "",
  password: "",
});

const loginRules = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(6) },
}));

const vLogin = useVuelidate(loginRules, loginForm);

const recoveryForm = ref({
  email: "",
});

const recoveryRules = computed(() => ({
  email: { required, email },
}));

const vRecovery = useVuelidate(recoveryRules, recoveryForm);

const onLoginSubmit = async () => {
  const isValid = await vLogin.value.$validate();
  if (isValid) {
    const { success, error } = await authStore.login(loginForm.value);
    if (success) {
      router.push("/dashboard");
    } else {
      errorMessage.value = error || t("login.validation.form_error");
      notify({
        title: t("error"),
        text: errorMessage.value,
        type: "error",
      });
    }
  } else {
    errorMessage.value = t("login.validation.form_error");
    notify({
      title: t("error"),
      text: errorMessage.value,
      type: "error",
    });
  }
};

const onRecoverySubmit = async () => {
  const isValid = await vRecovery.value.$validate();
  if (isValid) {
    const { success, error } = await authStore.recoverPassword(recoveryForm.value.email);
    if (success) {
      isRecoverySuccess.value = true;
    } else {
      errorMessage.value = error || t("login.validation.email_invalid");
      notify({
        title: t("error"),
        text: errorMessage.value,
        type: "error",
      });
    }
  } else {
    errorMessage.value = t("login.validation.email_invalid");
    notify({
      title: t("error"),
      text: errorMessage.value,
      type: "error",
    });
  }
};

const resetForm = ref({
  password: "",
  confirmPassword: "",
});

const resetRules = computed(() => ({
  password: { required, minLength: minLength(6) },
  confirmPassword: { required, sameAs: sameAs(resetForm.value.password) },
}));

const vReset = useVuelidate(resetRules, resetForm);

const onResetSubmit = async () => {
  const isValid = await vReset.value.$validate();
  if (isValid) {
    const { success, error } = await authStore.resetPassword({
      token: route.query.token as string,
      password: resetForm.value.password,
    });
    if (success) {
      router.push("/login");
    } else {
      errorMessage.value = error || t("login.validation.password_reset_error");
      notify({
        title: t("error"),
        text: errorMessage.value,
        type: "error",
      });
    }
  } else {
    errorMessage.value = t("login.validation.form_error");
    notify({
      title: t("error"),
      text: errorMessage.value,
      type: "error",
    });
  }
};

const showPasswordRecovery = () => {
  isPasswordRecoveryVisible.value = true;
  isResetPasswordVisible.value = false;
  isRecoverySuccess.value = false;
  recoveryForm.value.email = "";
  vLogin.value.$reset();
  vRecovery.value.$reset();
  errorMessage.value = null;
};

const showLoginForm = () => {
  isPasswordRecoveryVisible.value = false;
  isResetPasswordVisible.value = false;
  isRecoverySuccess.value = false;
  recoveryForm.value.email = "";
  vRecovery.value.$reset();
  errorMessage.value = null;
};

watch(selectedValueLanguage, (newValue) => {
  localStorage.setItem("selectedLanguage", newValue);
  locale.value = newValue;
});

watch(route, () => {
  isResetPasswordVisible.value = route.path === '/reset-password' && !!route.query.token;
  isPasswordRecoveryVisible.value = false;
  isRecoverySuccess.value = false;
});
</script>

<template>
  <div class="login-page">
    <div class="background-gradient">
      <div class="content">
        <div class="logo"></div>
        <div class="text">
          <div class="title">{{ t("login.welcome.title") }}</div>
          <div class="description">
            {{ t("login.welcome.description") }}
            <div class="second-description">
              {{ t("login.welcome.second_description") }}
            </div>
          </div>
        </div>
      </div>
      <div class="woman-lego-wrapper">
        <div class="woman-lego"></div>
      </div>
    </div>

    <div class="login-form-wrapper" v-if="!isPasswordRecoveryVisible && !isResetPasswordVisible">
      <div class="login-form">
        <div class="title">{{ t("login.form.title") }}</div>
        <div class="description">
          {{ t("login.form.description") }}
          <span class="name-company cursor-pointer">Gelios School</span>
        </div>
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
        <div class="form">
          <div class="form-email">
            <div class="label">{{ t("login.form.email.label") }}</div>
            <div class="field-email">
              <input
                  class="input"
                  :class="{ 'input-error': vLogin.email.$error }"
                  type="email"
                  :placeholder="t('login.form.email.placeholder')"
                  v-model="loginForm.email"
                  @blur="vLogin.email.$touch"
              />
              <div class="error-message" v-if="vLogin.email.$error">
                {{ vLogin.email.$errors[0].$message || t("login.validation.email") }}
              </div>
            </div>
          </div>
          <div class="form-password">
            <div class="label">{{ t("login.form.password.label") }}</div>
            <div class="field-password">
              <input
                  class="input"
                  :class="{ 'input-error': vLogin.password.$error }"
                  type="password"
                  :placeholder="t('login.form.password.placeholder')"
                  v-model="loginForm.password"
                  @blur="vLogin.password.$touch"
              />
              <div class="error-message" v-if="vLogin.password.$error">
                {{ vLogin.password.$errors[0].$message || t("login.validation.password") }}
              </div>
            </div>
          </div>
        </div>
        <div class="button login-button" @click="onLoginSubmit">{{ t("login.form.submit") }}</div>
        <div class="forgot-password">
          {{ t("login.form.forgot_password") }}
          <div class="refresh" @click="showPasswordRecovery">{{ t("login.form.recover") }}</div>
        </div>
      </div>
      <div class="button-register" @click="router.push('/register')">Реєстрація</div>
    </div>

    <div class="password-reset" v-else-if="isResetPasswordVisible">
      <div class="title">{{ t("login.reset.title") }}</div>
      <div class="form">
        <div class="description">
          {{ t("login.reset.description") }}
        </div>
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
        <div class="form-password">
          <div class="label">{{ t("login.reset.password.label") }}</div>
          <div class="field-password">
            <input
                class="input"
                :class="{ 'input-error': vReset.password.$error }"
                type="password"
                :placeholder="t('login.reset.password.placeholder')"
                v-model="resetForm.password"
                @blur="vReset.password.$touch"
            />
            <div class="error-message" v-if="vReset.password.$error">
              {{ vReset.password.$errors[0].$message || t("login.validation.password") }}
            </div>
          </div>
        </div>
        <div class="form-password">
          <div class="label">{{ t("login.reset.confirm_password.label") }}</div>
          <div class="field-password">
            <input
                class="input"
                :class="{ 'input-error': vReset.confirmPassword.$error }"
                type="password"
                :placeholder="t('login.reset.confirm_password.placeholder')"
                v-model="resetForm.confirmPassword"
                @blur="vReset.confirmPassword.$touch"
            />
            <div class="error-message" v-if="vReset.confirmPassword.$error">
              {{ vReset.confirmPassword.$errors[0].$message || t("login.validation.confirm_password") }}
            </div>
          </div>
        </div>
        <div class="button reset-button" @click="onResetSubmit">{{ t("login.reset.submit") }}</div>
        <div class="back-to-login" @click="showLoginForm">{{ t("login.reset.back") }}</div>
      </div>
    </div>

    <div class="password-recovery" v-else>
      <div class="title">{{ t("login.recovery.title") }}</div>
      <div class="form">
        <template v-if="!isRecoverySuccess">
          <div class="description">
            <span class="second-description">{{ t("login.recovery.description") }}</span>
            {{ t("login.recovery.description_suffix") }}
          </div>
          <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
          <div class="form-email">
            <div class="label">{{ t("login.recovery.email.label") }}</div>
            <div class="field-email">
              <input
                  class="input"
                  :class="{ 'input-error': vRecovery.email.$error }"
                  type="email"
                  :placeholder="t('login.recovery.email.placeholder')"
                  v-model="recoveryForm.email"
                  @blur="vRecovery.email.$touch"
              />
              <div class="error-message" v-if="vRecovery.email.$error">
                {{ vRecovery.email.$errors[0].$message || t("login.validation.email") }}
              </div>
            </div>
          </div>
          <div class="button recovery-button" @click="onRecoverySubmit">{{ t("login.recovery.submit") }}</div>
          <div class="back-to-login" @click="showLoginForm">{{ t("login.recovery.back") }}</div>
        </template>
        <template v-else>
          <div class="success-message">
            {{ t("login.recovery.success_message") }}
          </div>
          <div class="button" @click="showLoginForm">{{ t("login.form.title") }}</div>
        </template>
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
@use "@/assets/scss/mixins/mixins-media" as *;

.login-page {
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
      background: linear-gradient(147.31deg, #2d9aff 18.95%, #0066ff 121.1%);
      opacity: 0.7;
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

      .woman-lego {
        position: absolute;
        bottom: -35px;
        background-image: url("@/assets/images/lego-models/woman-with-roses.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 376px;
        height: 327px;
        z-index: 3;
      }
    }
  }

  .login-form-wrapper {
    width: 539px;
    position: absolute;
    right: 69px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 59px;

    .login-form {
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

        .form-email,
        .form-password {
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
          .field-password {
            .input {
              width: 100%;
              padding: 12px 16px;
              border: 1.5px solid #30303D26;
              border-radius: 12px;
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

        .form-password {
          .label {
            margin-bottom: 9px;
          }
        }
      }

      .login-button {
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

      .forgot-password {
        margin-top: 15px;
        display: flex;
        gap: 4px;
        justify-content: center;
        font-weight: 500;
        font-size: 16px;
        line-height: 100%;
        letter-spacing: 0%;
        color: #30303d;

        .refresh {
          cursor: pointer;
          color: #0066ff;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .password-recovery,
  .password-reset {
    width: 539px;
    position: absolute;
    right: 69px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    padding: 39px 44px;
    border-radius: 40px;
    box-shadow: 0px 25px 42.9px -18px #0066ff5c;
    background-color: #ffffff;

    .back-to-login {
      text-align: center;
      cursor: pointer;
      color: #0066ff;
      font-family: Onest;
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 20px;

      &:hover {
        text-decoration: underline;
      }
    }

    .title {
      font-family: "Onest", sans-serif;
      font-weight: 600;
      font-size: 44px;
      line-height: 100%;
      letter-spacing: -2%;
    }

    .description {
      margin-top: 10px;
      font-family: Onest;
      font-weight: 400;
      font-size: 21px;
      line-height: 100%;
      color: #888888;

      .second-description {
        color: #0066ff;
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 22px;

      .form-email,
      .form-password {
        .label {
          font-family: Onest;
          font-weight: 400;
          font-size: 16px;
          line-height: 100%;
          color: #30303d;
          margin-bottom: 17px;
        }

        .field-email,
        .field-password {
          .input {
            width: 100%;
            padding: 12px 16px;
            border: 1.5px solid #30303D26;
            border-radius: 12px;
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

      .success-message {
        color: #30303d;
        margin-bottom: 53px;
        margin-top: 53px;
        font-family: "Onest", sans-serif;
        font-weight: 400;
        font-size: 21px;
        line-height: 150%;
        letter-spacing: 0%;
      }
    }

    .recovery-button,
    .reset-button {
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
  }

  .select-language {
    margin: 60px;
  }
}

.error-message {
  color: #ff0000;
  font-family: Onest;
  font-size: 14px;
  margin-top: 8px;
}

@include media-max(large-desktop) {
  .login-page {
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
        background: linear-gradient(147.31deg, #2d9aff 18.95%, #0066ff 121.1%);
        opacity: 0.7;
        z-index: -1;
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: 30px;
        max-width: 373px;
        z-index: 2;

        .logo {
          background-image: url("@/assets/images/logo/logo.svg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          width: 46px;
          height: 46px;
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

        .woman-lego {
          position: absolute;
          bottom: -35px;
          background-image: url("@/assets/images/lego-models/woman-with-roses.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          width: 326px;
          height: 285px;
          z-index: 3;
        }
      }
    }

    .login-form-wrapper {
      width: 539px;
      position: relative;
      top: 50%;
      transform: translateY(-10%);
      margin: 0 auto;
      right: initial;
      display: flex;
      flex-direction: column;
      gap: 59px;
      z-index: 1000;

      .login-form {
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

          .form-email,
          .form-password {
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
            .field-password {
              .input {
                width: 100%;
                padding: 12px 16px;
                border: 1.5px solid #30303D26;
                border-radius: 12px;
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

          .form-password {
            .label {
              margin-bottom: 9px;
            }
          }
        }

        .login-button {
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

        .forgot-password {
          margin-top: 15px;
          display: flex;
          gap: 4px;
          justify-content: center;
          font-weight: 500;
          font-size: 16px;
          line-height: 100%;
          letter-spacing: 0%;
          color: #30303d;

          .refresh {
            cursor: pointer;
            color: #0066ff;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }

    .password-recovery,
    .password-reset {
      width: 539px;
      position: sticky;
      top: 50%;
      transform: translateY(-20%);
      margin: 0 auto;
      padding: 39px 44px;
      border-radius: 40px;
      box-shadow: 0px 25px 42.9px -18px #0066ff5c;
      background-color: #ffffff;
      z-index: 100;

      .back-to-login {
        text-align: center;
        cursor: pointer;
        color: #0066ff;
        font-family: Onest;
        font-weight: 500;
        font-size: 16px;
        margin-bottom: 20px;

        &:hover {
          text-decoration: underline;
        }
      }

      .title {
        font-family: "Onest", sans-serif;
        font-weight: 600;
        font-size: 44px;
        line-height: 100%;
        letter-spacing: -2%;
      }

      .description {
        margin-top: 10px;
        font-family: Onest;
        font-weight: 400;
        font-size: 21px;
        line-height: 100%;
        color: #888888;

        .second-description {
          color: #0066ff;
        }
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 22px;

        .form-email,
        .form-password {
          .label {
            font-family: Onest;
            font-weight: 400;
            font-size: 16px;
            line-height: 100%;
            color: #30303d;
            margin-bottom: 17px;
          }

          .field-email,
          .field-password {
            .input {
              width: 100%;
              padding: 12px 16px;
              border: 1.5px solid #30303D26;
              border-radius: 12px;
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

        .success-message {
          color: #30303d;
          margin-bottom: 53px;
          margin-top: 53px;
          font-family: "Onest", sans-serif;
          font-weight: 400;
          font-size: 21px;
          line-height: 150%;
          letter-spacing: 0%;
        }
      }

      .recovery-button,
      .reset-button {
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
    }

    .select-language {
      margin: 0;
      position: absolute;
      top: 34px;
      right: 34px;
      width: 200px;
    }
  }

  .error-message {
    color: #ff0000;
    font-family: Onest;
    font-size: 14px;
    margin-top: 8px;
  }
}

.button-register {
  background: #454A53;
  padding: 15px;
  color: #FFFFFF;
  font-family: Onest;
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  border-radius: 16px;
  cursor: pointer;
  
  &:hover {
    background: #353639;
  }
}
</style>