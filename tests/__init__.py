from unittest import TestResult

import openai

original_test_run = TestResult.startTestRun


def start_test_run_with_stubbed_openai(self):  # type: ignore
    openai.api_key = 'openai-test-key'
    openai.api_base = 'https://openai.example.com'
    original_test_run(self)


TestResult.startTestRun = start_test_run_with_stubbed_openai  # type: ignore
