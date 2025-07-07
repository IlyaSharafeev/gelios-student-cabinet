<script setup lang="ts">
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, sameAs } from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { notify } = useNotification();
const authStore = useAuthStore();
const router = useRouter();

const changePasswordForm = ref({
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const changePasswordRules = computed(() => ({
  oldPassword: {
    required,
    minLength: minLength(6)
  },
  newPassword: {
    required,
    minLength: minLength(6)
  },
  confirmNewPassword: {
    required,
    sameAs: sameAs(changePasswordForm.value.newPassword)
  },
}));

const vChangePassword = useVuelidate(changePasswordRules, changePasswordForm);

const errorMessage = ref<string | null>(null);

const onChangePasswordSubmit = async () => {
  const isValid = await vChangePassword.value.$validate();
  if (isValid) {
    const { success, error } = await authStore.changePassword(changePasswordForm.value);
    if (success) {
      notify({
        title: t("change_password.notifications.success.title"),
        text: t("change_password.notifications.success.text"),
        type: "success",
      });
      router.push("/dashboard");
    } else {
      errorMessage.value = error || t("change_password.notifications.error.text");
      notify({
        title: t("change_password.notifications.error.title"),
        text: errorMessage.value,
        type: "error",
      });
    }
  } else {
    errorMessage.value = t("change_password.notifications.validation.text");
    notify({
      title: t("change_password.notifications.validation.title"),
      text: errorMessage.value,
      type: "error",
    });
  }
};

// Computed validation errors for each field
const oldPasswordErrors = computed(() => {
  if (vChangePassword.value.oldPassword.$dirty && vChangePassword.value.oldPassword.$errors.length) {
    return vChangePassword.value.oldPassword.$errors.map(error => {
      if (error.$validator === 'required') return t('change_password.validation.password');
      if (error.$validator === 'minLength') return t('change_password.validation.password');
      return '';
    });
  }
  return [];
});

const newPasswordErrors = computed(() => {
  if (vChangePassword.value.newPassword.$dirty && vChangePassword.value.newPassword.$errors.length) {
    return vChangePassword.value.newPassword.$errors.map(error => {
      if (error.$validator === 'required') return t('change_password.validation.password');
      if (error.$validator === 'minLength') return t('change_password.validation.password');
      return '';
    });
  }
  return [];
});

const confirmNewPasswordErrors = computed(() => {
  if (vChangePassword.value.confirmNewPassword.$dirty && vChangePassword.value.confirmNewPassword.$errors.length) {
    return vChangePassword.value.confirmNewPassword.$errors.map(error => {
      if (error.$validator === 'required') return t('change_password.validation.confirm_password');
      if (error.$validator === 'sameAs') return t('change_password.validation.confirm_password');
      return '';
    });
  }
  return [];
});
</script>

<template>
  <div class="change-password-page">
    <div class="change-password-form">
      <h2 class="title">{{ t("change_password.form.title") }}</h2>
      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      <div class="form">
        <div class="form-old-password">
          <div class="label">{{ t("change_password.form.old_password.label") }}</div>
          <div class="field-old-password">
            <input
                class="input"
                :class="{ 'input-error': oldPasswordErrors.length }"
                type="password"
                :placeholder="t('change_password.form.old_password.placeholder')"
                v-model="changePasswordForm.oldPassword"
                @blur="vChangePassword.oldPassword.$touch"
            />
            <div class="error-message" v-if="oldPasswordErrors.length">
              {{ oldPasswordErrors[0] }}
            </div>
          </div>
        </div>
        <div class="form-new-password">
          <div class="label">{{ t("change_password.form.new_password.label") }}</div>
          <div class="field-new-password">
            <input
                class="input"
                :class="{ 'input-error': newPasswordErrors.length }"
                type="password"
                :placeholder="t('change_password.form.new_password.placeholder')"
                v-model="changePasswordForm.newPassword"
                @blur="vChangePassword.newPassword.$touch"
            />
            <div class="error-message" v-if="newPasswordErrors.length">
              {{ newPasswordErrors[0] }}
            </div>
          </div>
        </div>
        <div class="form-confirm-new-password">
          <div class="label">{{ t("change_password.form.confirm_new_password.label") }}</div>
          <div class="field-confirm-new-password">
            <input
                class="input"
                :class="{ 'input-error': confirmNewPasswordErrors.length }"
                type="password"
                :placeholder="t('change_password.form.confirm_new_password.placeholder')"
                v-model="changePasswordForm.confirmNewPassword"
                @blur="vChangePassword.confirmNewPassword.$touch"
            />
            <div class="error-message" v-if="confirmNewPasswordErrors.length">
              {{ confirmNewPasswordErrors[0] }}
            </div>
          </div>
        </div>
      </div>
      <div class="button change-password-button" @click="onChangePasswordSubmit">{{ t("change_password.form.submit") }}</div>
    </div>

    <notifications />
  </div>
</template>

<style scoped lang="scss">
.change-password-page {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;

  .change-password-form {
    width: 320px;
    border-radius: 20px;
    background-color: #ffffff;

    .title {
      font-family: "Onest", sans-serif;
      font-weight: 600;
      font-size: 36px;
      line-height: 100%;
      letter-spacing: -2%;
      color: #30303d;
      margin-bottom: 20px;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 30px;

      .form-old-password,
      .form-new-password,
      .form-confirm-new-password {
        .label {
          font-family: Onest;
          font-weight: 400;
          font-size: 16px;
          line-height: 100%;
          letter-spacing: 0%;
          color: #30303d;
          margin-bottom: 12px;
        }

        .field-old-password,
        .field-new-password,
        .field-confirm-new-password {
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
    }

    .change-password-button {
      margin-top: 30px;
      background-color: #0066ff;
      color: #ffffff;
      padding: 16px;
      border-radius: 16px;
      text-align: center;
      cursor: pointer;
      font-family: Onest;
      font-weight: 600;
      font-size: 18px;
      width: 118px;

      &:hover {
        background-color: #0055cc;
      }
    }
  }

  .error-message {
    color: #ff0000;
    font-family: Onest;
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>